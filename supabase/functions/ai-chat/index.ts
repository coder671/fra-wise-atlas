import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ALLOWED_LANGUAGES = ['en', 'hi', 'te', 'or', 'bn'];
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_LENGTH = 50;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing authorization header');
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Authentication failed:', authError?.message);
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { message, language = 'en', history = [] } = await req.json();

    // Validate inputs
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: 'Message too long' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (language && !ALLOWED_LANGUAGES.includes(language)) {
      return new Response(
        JSON.stringify({ error: 'Invalid language' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!Array.isArray(history) || history.length > MAX_HISTORY_LENGTH) {
      return new Response(
        JSON.stringify({ error: 'Invalid history' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate history structure
    for (const entry of history) {
      if (!entry.role || !entry.content || typeof entry.content !== 'string') {
        return new Response(
          JSON.stringify({ error: 'Invalid history format' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Build system prompt based on language
    const systemPrompts: { [key: string]: string } = {
      en: 'You are a helpful assistant for tribal land rights and Community Forest Resources (CFR) in India. Help users with questions about their land, forest rights, IoT sensor data, and environmental monitoring. Be concise and respectful. Address users as "Namaste!"',
      hi: 'आप भारत में आदिवासी भूमि अधिकारों और सामुदायिक वन संसाधनों (सीएफआर) के लिए एक सहायक सहायक हैं। उपयोगकर्ताओं को उनकी भूमि, वन अधिकार, आईओटी सेंसर डेटा और पर्यावरण निगरानी के बारे में प्रश्नों में मदद करें। नमस्ते के साथ उपयोगकर्ताओं को संबोधित करें।',
      te: 'మీరు భారతదేశంలో గిరిజన భూమి హక్కులు మరియు కమ్యూనిటీ ఫారెస్ట్ రిసోర్సెస్ (CFR) కోసం సహాయక సహాయకులు. వినియోగదారులకు వారి భూమి, అటవీ హక్కులు, IoT సెన్సార్ డేటా మరియు పర్యావరణ పర్యవేక్షణ గురించి ప్రశ్నలతో సహాయం చేయండి। నమస్కారంతో వినియోగదారులను సంబోధించండి।',
      or: 'ଆପଣ ଭାରତରେ ଆଦିବାସୀ ଜମି ଅଧିକାର ଏବଂ ସମ୍ପ୍ରଦାୟ ଜଙ୍ଗଲ ସମ୍ପଦ (CFR) ପାଇଁ ଏକ ସହାୟକ ସହାୟକ | ବ୍ୟବହାରକାରୀମାନଙ୍କୁ ସେମାନଙ୍କର ଜମି, ଜଙ୍ଗଲ ଅଧିକାର, IoT ସେନ୍ସର ତଥ୍ୟ ଏବଂ ପରିବେଶ ନିରୀକ୍ଷଣ ବିଷୟରେ ପ୍ରଶ୍ନରେ ସାହାଯ୍ୟ କରନ୍ତୁ | ନମସ୍କାର ସହିତ ବ୍ୟବହାରକାରୀମାନଙ୍କୁ ସମ୍ବୋଧନ କରନ୍ତୁ |',
      bn: 'আপনি ভারতে উপজাতি ভূমি অধিকার এবং কমিউনিটি ফরেস্ট রিসোর্স (CFR) এর জন্য একজন সহায়ক সহায়ক। ব্যবহারকারীদের তাদের জমি, বন অধিকার, IoT সেন্সর ডেটা এবং পরিবেশ পর্যবেক্ষণ সম্পর্কে প্রশ্নে সহায়তা করুন। নমস্কার দিয়ে ব্যবহারকারীদের সম্বোধন করুন।'
    };

    const systemPrompt = systemPrompts[language] || systemPrompts.en;

    // Build messages array with history
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Call Lovable AI
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to process request' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
