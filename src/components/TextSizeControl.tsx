import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Type } from "lucide-react";

type TextSize = 'small' | 'medium' | 'large' | 'xlarge';

export const TextSizeControl = () => {
  const [textSize, setTextSize] = useState<TextSize>('medium');

  useEffect(() => {
    const savedSize = localStorage.getItem('textSize') as TextSize;
    if (savedSize) {
      setTextSize(savedSize);
      applyTextSize(savedSize);
    }
  }, []);

  const applyTextSize = (size: TextSize) => {
    const root = document.documentElement;
    const sizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px'
    };
    root.style.fontSize = sizes[size];
  };

  const handleSizeChange = (size: TextSize) => {
    setTextSize(size);
    applyTextSize(size);
    localStorage.setItem('textSize', size);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title="Text Size">
          <Type className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Text Size</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleSizeChange('small')}>
          <span className={textSize === 'small' ? 'font-bold' : ''}>A- Small</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSizeChange('medium')}>
          <span className={textSize === 'medium' ? 'font-bold' : ''}>A  Medium</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSizeChange('large')}>
          <span className={textSize === 'large' ? 'font-bold' : ''}>A+ Large</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSizeChange('xlarge')}>
          <span className={textSize === 'xlarge' ? 'font-bold' : ''}>A++ Extra Large</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
