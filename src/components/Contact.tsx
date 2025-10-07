import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon, LinkedinIcon, GithubIcon } from "lucide-react";

const Contact = () => {
  const contacts = [
    {
      icon: MailIcon,
      title: "Email",
      value: "fraatlas@gov.in",
      link: "mailto:fraatlas@gov.in",
    },
    {
      icon: PhoneIcon,
      title: "Helpline",
      value: "1800-123-4567",
      link: "tel:18001234567",
    },
    {
      icon: MapPinIcon,
      title: "Address",
      value: "Ministry of Tribal Affairs, Shastri Bhawan, New Delhi - 110001",
      link: null,
    },
    {
      icon: GlobeIcon,
      title: "Website",
      value: "tribal.nic.in",
      link: "https://tribal.nic.in",
    },
  ];

  const ministries = [
    {
      name: "Ministry of Tribal Affairs",
      role: "Policy & Implementation",
      contact: "tribal.nic.in",
    },
    {
      name: "Ministry of Environment, Forest & Climate Change",
      role: "Forest Conservation",
      contact: "moef.gov.in",
    },
    {
      name: "NITI Aayog",
      role: "Strategic Planning",
      contact: "niti.gov.in",
    },
    {
      name: "State Forest Departments",
      role: "Ground Implementation",
      contact: "Various State Portals",
    },
  ];

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Contact & Support
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Get in touch with our team for support, partnerships, or queries about FRA implementation
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <Card className="glass-card p-6 hover:glow-effect smooth-transition">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <contact.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">{contact.title}</h3>
                  {contact.link ? (
                    <a 
                      href={contact.link}
                      className="text-muted-foreground hover:text-primary smooth-transition"
                      target={contact.link.startsWith("http") ? "_blank" : undefined}
                      rel={contact.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{contact.value}</p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Ministry Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6 text-card-foreground">Partner Ministries & Departments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ministries.map((ministry, index) => (
              <motion.div
                key={ministry.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10"
              >
                <h4 className="font-semibold text-card-foreground mb-1">{ministry.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{ministry.role}</p>
                <p className="text-xs text-primary">{ministry.contact}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Emergency Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="glass-card p-8 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="text-center space-y-4">
            <PhoneIcon className="w-16 h-16 mx-auto text-primary animate-float" />
            <h3 className="text-2xl font-bold text-card-foreground">24/7 Emergency Support</h3>
            <p className="text-4xl font-bold text-primary">1800-FRA-HELP</p>
            <p className="text-muted-foreground">
              For urgent queries related to forest rights violations or claim processing issues
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Social Links & Community */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Card className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-card-foreground">Connect With Us</h3>
          <div className="flex justify-center gap-6">
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="p-4 bg-primary/20 rounded-full hover:bg-primary/30 smooth-transition"
            >
              <LinkedinIcon className="w-8 h-8 text-primary" />
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="p-4 bg-primary/20 rounded-full hover:bg-primary/30 smooth-transition"
            >
              <GithubIcon className="w-8 h-8 text-primary" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="p-4 bg-primary/20 rounded-full hover:bg-primary/30 smooth-transition"
            >
              <GlobeIcon className="w-8 h-8 text-primary" />
            </motion.a>
          </div>
          <p className="text-center text-muted-foreground mt-6">
            Join our community of developers, policymakers, and tribal welfare advocates
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Contact;
