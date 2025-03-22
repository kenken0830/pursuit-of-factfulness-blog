import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// lucide-reactのアイコンコンポーネントの型定義
declare module 'lucide-react' {
  export const Cpu: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Network: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Server: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Code: React.FC<React.SVGProps<SVGSVGElement>>;
  export const CheckCircle: React.FC<React.SVGProps<SVGSVGElement>>;
  export const ArrowRight: React.FC<React.SVGProps<SVGSVGElement>>;
  export const BarChart: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Layers: React.FC<React.SVGProps<SVGSVGElement>>;
}

export {};
