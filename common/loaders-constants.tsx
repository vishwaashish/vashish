import {
  type ILoaderParams,
  type LoaderSizeType,
  type LoaderType,
} from '@/types/css-loaders.model'

export const LOADER_COUNT = 24

export const MODAL_BG = [
  '#845EC2',
  '#D65DB1',
  '#FF6F91',
  '#FF9671',
  '#FFC75F',
  '#00C9A7',
  '#B39CD0',
  '#845EC2',
  '#4D8076',
]

export const LOADER_PARAMS = (
  {
    // size,
    // border,
    // speed,
    // primaryColor,
    // secondaryColor,
    // sourceCode,
  }: ILoaderParams,
) => ''
// `?size=${size}&border=${border}&speed=${speed}&primaryColor=${primaryColor}&secondaryColor=${secondaryColor}&sourceCode=${sourceCode}`

export const LOADER_SIZES: LoaderSizeType[] = [
  {
    size: 24,
    label: 'XS',
    title: 'Extra Small',
  },
  {
    size: 36,
    label: 'S',
    title: 'Small',
  },
  {
    size: 48,
    label: 'M',
    title: 'Medium',
  },
  {
    size: 60,
    label: 'L',
    title: 'Large',
  },
  {
    size: 72,
    label: 'XL',
    title: 'Extra Large',
  },
]

export const LOADER_BORDER_SIZES: LoaderSizeType[] = [
  {
    size: 3,
    label: 'S',
    title: 'Small',
  },
  {
    size: 5,
    label: 'M',
    title: 'Medium',
  },
  {
    size: 7,
    label: 'L',
    title: 'Large',
  },
]
export const LOADER_SPEED: LoaderSizeType[] = [
  {
    size: 1.5,
    label: 'S',
    title: 'Small',
  },
  {
    size: 1,
    label: 'M',
    title: 'Medium',
  },
  {
    size: 0.5,
    label: 'F',
    title: 'Fast',
  },
]

export const DEFAULT_SETTINGS: ILoaderParams = {
  size: 'M',
  primaryColor: '570df8',
  secondaryColor: 'ffffff',
  border: 'M',
  speed: 'S',
  sourceCode: 'false',
}

export const containerStyle = {
  sidebar: {
    initial: {
      x: 500,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  },
  sidebarOverlay: {
    initial: {
      x: 500,
      opacity: 0,

      transition: {
        duration: 0.1,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  },
  sidebarReset: {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    pressed: { scale: 0.95 },
  },
  sidebarResetArrow: {
    rest: { rotate: 0, transition: { duration: 0.4 } },
    hover: { rotate: -360, transition: { duration: 0.4 } },
  },
}

export const modalStyle = {
  backdrop: {
    initial: {
      opacity: 0,
    },
    open: {
      opacity: 0.8,
    },
  },
  dialog: {
    initial: {
      y: 700,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 250,
        duration: 0.3,
      },
    },
  },
}

export const LOADER: LoaderType[] = [
  {
    id: 1,
    html: '<div class="loader1"></div>',
    css: `.loader1 {
      width: var(--loader-width);
      height: var(--loader-width);
      border: var(--loader-border) solid var(--loader-secondary);
      border-bottom-color: var(--loader-primary);
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation var(--loader-speed) linear infinite;
    }
    
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
    
      100% {
        transform: rotate(360deg);
      }
    }`,
  },
  {
    id: 2,
    html: '<div class="loader2"></div>',
    css: `.loader2 {
      width: var(--loader-width);
      height: var(--loader-width);
      border: var(--loader-border) solid var(--loader-primary);
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation2 var(--loader-speed) linear infinite;
  }
  
  @keyframes rotation2 {
      0% {
          transform: rotate(0deg);
      }
  
      100% {
          transform: rotate(360deg);
      }
  }`,
  },
  {
    id: 3,
    html: '<div class="loader3"></div>',
    css: `.loader3 {
      width: var(--loader-width);
      height: var(--loader-width);
      border-radius: 50%;
      position: relative;
      animation: rotate3 var(--loader-speed) linear infinite;
   }


   .loader3::after, .loader3::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: var(--loader-border) solid var(--loader-secondary);
    animation: prixClipFix3 2s linear infinite;
 }
  .loader3::after {
    transform: rotate3d(90, 90, 0, 180deg);
    border-color: var(--loader-primary);
 }

  @keyframes rotate3 {
    0% {
      transform: rotate(0deg);
   }
    100% {
      transform: rotate(360deg);
   }
 }
  @keyframes prixClipFix3 {
    0% {
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
   }
    50% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
   }
    75%, 100% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
   }
 }
   
    `,
  },
  {
    id: 4,
    html: '<div class="loader4"></div>',
    css: `.loader4 {
      width: var(--loader-width);
      height: var(--loader-width);
      border-radius: 50%;
      position: relative;
      animation: rotate4 var(--loader-speed) linear infinite;
   }
    .loader4::before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: var(--loader-border) solid var(--loader-primary);
      animation: prixClipFix4 2s linear infinite;
   }
    @keyframes rotate4 {
      100% {
        transform: rotate(360deg);
     }
   }
    @keyframes prixClipFix4 {
      0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
     }
      25% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
     }
      50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
     }
      75% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
     }
      100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
     }
   }
    `,
  },
  {
    id: 5,
    html: '<div class="loader5"></div>',
    css: `.loader5 {
      width: var(--loader-width);
      height: var(--loader-width);
      border-radius: 50%;
      position: relative;
      animation: rotate5 var(--loader-speed) linear infinite;
   }
    .loader5::before, .loader5::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: var(--loader-border) solid var(--loader-secondary);
      animation: prixClipFix5 2s linear infinite;
   }
    .loader5::after {
      inset: 8px;
      transform: rotate3d(90, 90, 0, 180deg);
      border-color: var(--loader-primary);
   }
    @keyframes rotate5 {
      0% {
        transform: rotate(0deg);
     }
      100% {
        transform: rotate(360deg);
     }
   }
    @keyframes prixClipFix5 {
      0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
     }
      50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
     }
      75%, 100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
     }
   }
    `,
  },
  {
    id: 6,
    html: '<div class="loader6"></div>',
    css: `.loader6 {
      width: var(--loader-width);
      height: var(--loader-width);
      border-radius: 50%;
      position: relative;
      animation: rotate6 var(--loader-speed) linear infinite;
   }
    .loader6::before, .loader6::after {
      content: "";
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: var(--loader-border) solid var(--loader-secondary);
      animation: prixClipFix6 2s linear infinite;
   }
    .loader6::after {
      border-color: var(--loader-primary);
      animation: prixClipFix6 2s linear infinite, rotate 0.5s linear infinite reverse;
      inset: 6px;
   }
    @keyframes rotate6 {
      0% {
        transform: rotate(0deg);
     }
      100% {
        transform: rotate(360deg);
     }
   }
    @keyframes prixClipFix6 {
      0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
     }
      25% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
     }
      50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
     }
      75% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
     }
      100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
     }
   }
    `,
  },
  {
    id: 7,
    html: '<div class="loader7"></div>',
    css: `.loader7 {
      width: var(--loader-width);
      height: var(--loader-width);
      border: var(--loader-border) solid var(--loader-secondary);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      animation: rotation7 var(--loader-speed) linear infinite;
   }
    .loader7::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(var(--loader-width) + 18px);
      height: calc(var(--loader-width) + 18px);
      border-radius: 50%;
      border: var(--loader-border) solid transparent;
      border-bottom-color: var(--loader-primary);
   }
    @keyframes rotation7 {
      0% {
        transform: rotate(0deg);
     }
      100% {
        transform: rotate(360deg);
     }
   } 
    `,
  },
  {
    id: 8,
    html: '<div class="loader8"></div>',
    css: `.loader8 {
      width: var(--loader-width);
      height: var(--loader-width);
      border-radius: 50%;
      display: inline-block;
      border-top: var(--loader-border) solid var(--loader-secondary);
      border-right: var(--loader-border) solid transparent;
      box-sizing: border-box;
      animation: rotation8 var(--loader-speed) linear infinite;
    }
    
    @keyframes rotation8 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    `,
  },
  {
    id: 9,
    html: '<div class="loader9"></div>',
    css: `.loader9 {
      width: var(--loader-width);
      height: var(--loader-width);
      border: var(--loader-border) solid var(--loader-secondary);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      animation: rotation9 var(--loader-speed) linear infinite;
    }
    .loader9::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(var(--loader-width) - 15px);
      height: calc(var(--loader-width) - 15px);
      border-radius: 50%;
      border: var(--loader-border) solid;
      border-color: var(--loader-primary) transparent;
    }
    
    @keyframes rotation9 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    `,
  },
  {
    id: 10,
    html: '<div class="loader10"></div>',
    css: `.loader10 {
      width: var(--loader-width);
      height: var(--loader-width);
      border: var(--loader-border) solid var(--loader-secondary);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      animation: rotation10 var(--loader-speed) linear infinite;
    }
    .loader10::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(var(--loader-width) + 15px);
      height: calc(var(--loader-width) + 15px);
      border-radius: 50%;
      border: var(--loader-border) solid;
      border-color: var(--loader-primary) transparent;
    }
    
    @keyframes rotation10 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    `,
  },
  {
    id: 11,
    html: '<div class="loader11"></div>',
    css: `.loader11 {
      width: var(--loader-width);
      height: var(--loader-width);
      border: var(--loader-border) solid var(--loader-secondary);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      animation: rotation11 var(--loader-speed) linear infinite;
    }
    .loader11::after,
    .loader11::before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 0;
      background: var(--loader-primary);
      width: var(--loader-border);
      height: var(--loader-border);
      transform: translate(150%, 150%);
      border-radius: 50%;
    }
    .loader11::before {
      left: auto;
      top: auto;
      right: 0;
      bottom: 0;
      transform: translate(-150%, -150%);
    }
    
    @keyframes rotation11 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    `,
  },
  {
    id: 12,
    html: '<div class="loader12"></div>',
    css: `.loader12 {
      width: var(--loader-width);
      height: var(--loader-width);
      border: var(--loader-border) solid var(--loader-secondary);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      animation: rotation12 var(--loader-speed) linear infinite;
    }
    .loader12::after,
    .loader12::before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 0;
      background: var(--loader-primary);
      width: calc(var(--loader-border)  );
      height: calc(var(--loader-border) );
      border-radius: 50%;
    }
    .loader12::before {
      left: auto;
      top: auto;
      right: 0;
      bottom: 0;
    }
    
    @keyframes rotation12 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    `,
  },
  {
    id: 13,
    html: '<div class="loader13"></div>',
    css: `.loader13 {
      width: var(--loader-width);
      height: var(--loader-width);
      border: var(--loader-border) solid var(--loader-secondary);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      animation: rotation13 var(--loader-speed) linear infinite;
    }
    .loader13::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 0;
      background: var(--loader-primary);
      width: calc(var(--loader-border) + 10px);
      height: calc(var(--loader-border) + 10px);
      transform: translate(-50%, 50%);
      border-radius: 50%;
    }
    
    @keyframes rotation13 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
     `,
  },
  {
    id: 14,
    html: '<div class="loader14"></div>',
    css: `.loader14 {
      width: var(--loader-width);
      height: var(--loader-width);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      border: var(--loader-border) solid;
      border-color: var(--loader-secondary) var(--loader-secondary) transparent;
      box-sizing: border-box;
      animation: rotation14 var(--loader-speed) linear infinite;
    }
    .loader14::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border: var(--loader-border) solid;
      border-color: transparent var(--loader-primary) var(--loader-primary);
      width: calc(var(--loader-width) - 20px);
      height: calc(var(--loader-width) - 20px);
      border-radius: 50%;
      animation: rotationBack14 0.5s linear infinite;
      transform-origin: center center;
    }
    
    @keyframes rotation14 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes rotationBack14 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
    `,
  },
  {
    id: 15,
    html: '<div class="loader15"></div>',
    css: `.loader15 {
      width: var(--loader-width);
      height: var(--loader-width);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      border: var(--loader-border) solid;
      border-color: var(--loader-secondary) var(--loader-secondary) transparent transparent;
      box-sizing: border-box;
      animation: rotation15 var(--loader-speed) linear infinite;
    }
    .loader15::after,
    .loader15::before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border: var(--loader-border) solid;
      border-color: transparent transparent var(--loader-primary) var(--loader-primary);
      width: calc(var(--loader-width) - 24px);
      height: calc(var(--loader-width) - 24px);
      border-radius: 50%;
      box-sizing: border-box;
      animation: rotationBack15 0.5s linear infinite;
      transform-origin: center center;
    }
    .loader15::before {
      width: calc(var(--loader-width) - 12px);
      height: calc(var(--loader-width) - 12px);
      border-color: var(--loader-secondary) var(--loader-secondary) transparent transparent;
      animation: rotation15 1.5s linear infinite;
    }
    
    @keyframes rotation15 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes rotationBack15 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
    `,
  },
  {
    id: 16,
    html: '<div class="loader16"></div>',
    css: `.loader16 {
      width: var(--loader-width);
      height: var(--loader-width);
      border: var(--loader-border) dotted var(--loader-secondary);
      border-style: solid solid dotted dotted;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      animation: rotation16 2s linear infinite;
    }
    .loader16::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border: var(--loader-border) dotted var(--loader-primary);
      border-style: solid solid dotted;
      width: calc(var(--loader-width) - 15px);
      height: calc(var(--loader-width) - 15px);
      border-radius: 50%;
      animation: rotationBack16 var(--loader-speed) linear infinite;
      transform-origin: center center;
    }
    
    @keyframes rotation16 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes rotationBack16 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
    `,
  },
  {
    id: 17,
    html: '<div class="loader17"></div>',
    css: `.loader17 {
      width: var(--loader-width);
      height: var(--loader-width);
      border: var(--loader-border) solid var(--loader-secondary);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      animation: rotation17 var(--loader-speed) linear infinite;
    }
    .loader17::after {
      content: '';  
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 0;
      background: var(--loader-primary);
      width: var(--loader-border);
      height: calc(var(--loader-width) - 70% );
      transform: translateX(-50%);
    }
        
    @keyframes rotation17 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    `,
  },
  {
    id: 18,
    html: '<div class="loader18"></div>',
    css: `.loader18 {
      color: var(--loader-secondary);
      font-size: calc(var(--loader-border) + 5px);
      width: calc(var(--loader-width) - 1.9rem);
      height: calc(var(--loader-width) - 1.9rem);
      border-radius: 50%;
      position: relative;
      text-indent: -9999em;
      animation: mulShdSpin18 1.3s infinite linear;
      transform: translateZ(0);
    }
    
    @keyframes mulShdSpin18 {
      0%,
      100% {
        box-shadow:
          0 -3em 0 0.2em,
          2em -2em 0 0em,
          3em 0 0 -1em,
          2em 2em 0 -1em,
          0 3em 0 -1em,
          -2em 2em 0 -1em,
          -3em 0 0 -1em,
          -2em -2em 0 0;
      }
      12.5% {
        box-shadow:
          0 -3em 0 0,
          2em -2em 0 0.2em,
          3em 0 0 0,
          2em 2em 0 -1em,
          0 3em 0 -1em,
          -2em 2em 0 -1em,
          -3em 0 0 -1em,
          -2em -2em 0 -1em;
      }
      25% {
        box-shadow:
          0 -3em 0 -0.5em,
          2em -2em 0 0,
          3em 0 0 0.2em,
          2em 2em 0 0,
          0 3em 0 -1em,
          -2em 2em 0 -1em,
          -3em 0 0 -1em,
          -2em -2em 0 -1em;
      }
      37.5% {
        box-shadow:
          0 -3em 0 -1em,
          2em -2em 0 -1em,
          3em 0em 0 0,
          2em 2em 0 0.2em,
          0 3em 0 0em,
          -2em 2em 0 -1em,
          -3em 0em 0 -1em,
          -2em -2em 0 -1em;
      }
      50% {
        box-shadow:
          0 -3em 0 -1em,
          2em -2em 0 -1em,
          3em 0 0 -1em,
          2em 2em 0 0em,
          0 3em 0 0.2em,
          -2em 2em 0 0,
          -3em 0em 0 -1em,
          -2em -2em 0 -1em;
      }
      62.5% {
        box-shadow:
          0 -3em 0 -1em,
          2em -2em 0 -1em,
          3em 0 0 -1em,
          2em 2em 0 -1em,
          0 3em 0 0,
          -2em 2em 0 0.2em,
          -3em 0 0 0,
          -2em -2em 0 -1em;
      }
      75% {
        box-shadow:
          0em -3em 0 -1em,
          2em -2em 0 -1em,
          3em 0em 0 -1em,
          2em 2em 0 -1em,
          0 3em 0 -1em,
          -2em 2em 0 0,
          -3em 0em 0 0.2em,
          -2em -2em 0 0;
      }
      87.5% {
        box-shadow:
          0em -3em 0 0,
          2em -2em 0 -1em,
          3em 0 0 -1em,
          2em 2em 0 -1em,
          0 3em 0 -1em,
          -2em 2em 0 0,
          -3em 0em 0 0,
          -2em -2em 0 0.2em;
      }
    }
    `,
  },
  {
    id: 19,
    html: '<div class="loader19"></div>',
    css: `.loader19 {
      color: var(--loader-secondary);
      font-size: calc(var(--loader-width) - 15px);
      text-indent: -9999em;
      overflow: hidden;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      position: relative;
      transform: translateZ(0);
      animation:
        mltShdSpin19 1.7s infinite ease,
        round19 1.7s infinite ease;
    }
    
    @keyframes mltShdSpin19 {
      0% {
        box-shadow:
          0 -0.83em 0 -0.4em,
          0 -0.83em 0 -0.42em,
          0 -0.83em 0 -0.44em,
          0 -0.83em 0 -0.46em,
          0 -0.83em 0 -0.477em;
      }
      5%,
      95% {
        box-shadow:
          0 -0.83em 0 -0.4em,
          0 -0.83em 0 -0.42em,
          0 -0.83em 0 -0.44em,
          0 -0.83em 0 -0.46em,
          0 -0.83em 0 -0.477em;
      }
      10%,
      59% {
        box-shadow:
          0 -0.83em 0 -0.4em,
          -0.087em -0.825em 0 -0.42em,
          -0.173em -0.812em 0 -0.44em,
          -0.256em -0.789em 0 -0.46em,
          -0.297em -0.775em 0 -0.477em;
      }
      20% {
        box-shadow:
          0 -0.83em 0 -0.4em,
          -0.338em -0.758em 0 -0.42em,
          -0.555em -0.617em 0 -0.44em,
          -0.671em -0.488em 0 -0.46em,
          -0.749em -0.34em 0 -0.477em;
      }
      38% {
        box-shadow:
          0 -0.83em 0 -0.4em,
          -0.377em -0.74em 0 -0.42em,
          -0.645em -0.522em 0 -0.44em,
          -0.775em -0.297em 0 -0.46em,
          -0.82em -0.09em 0 -0.477em;
      }
      100% {
        box-shadow:
          0 -0.83em 0 -0.4em,
          0 -0.83em 0 -0.42em,
          0 -0.83em 0 -0.44em,
          0 -0.83em 0 -0.46em,
          0 -0.83em 0 -0.477em;
      }
    }
    
    @keyframes round19 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    `,
  },
  {
    id: 20,
    html: '<div class="loader20"></div>',
    css: `.loader20 {
      font-size: calc(var(--loader-border) + 2px);
      width: calc(var(--loader-width) - 10px);
      height: calc(var(--loader-width) - 10px);
      border-radius: 50%;
      position: relative;
      text-indent: -9999em;
      animation: mulShdSpin20 var(--loader-speed) infinite ease;
      animation: mulShdSpin20 var(--loader-speed) infinite ease;
      transform: translateZ(0);
    }
    @keyframes mulShdSpin20 {
      0%,
      100% {
        box-shadow:
          0em -2.6em 0em 0em var(--loader-secondary),
          1.8em -1.8em 0 0em rgba(216, 221, 228, 0.2),
          2.5em 0em 0 0em rgba(216, 221, 228, 0.2),
          1.75em 1.75em 0 0em rgba(216, 221, 228, 0.2),
          0em 2.5em 0 0em rgba(216, 221, 228, 0.2),
          -1.8em 1.8em 0 0em rgba(216, 221, 228, 0.2),
          -2.6em 0em 0 0em rgba(216, 221, 228, 0.5),
          -1.8em -1.8em 0 0em rgba(216, 221, 228, 0.7);
      }
      12.5% {
        box-shadow:
          0em -2.6em 0em 0em rgba(216, 221, 228, 0.7),
          1.8em -1.8em 0 0em var(--loader-secondary),
          2.5em 0em 0 0em rgba(216, 221, 228, 0.2),
          1.75em 1.75em 0 0em rgba(216, 221, 228, 0.2),
          0em 2.5em 0 0em rgba(216, 221, 228, 0.2),
          -1.8em 1.8em 0 0em rgba(216, 221, 228, 0.2),
          -2.6em 0em 0 0em rgba(216, 221, 228, 0.2),
          -1.8em -1.8em 0 0em rgba(216, 221, 228, 0.5);
      }
      25% {
        box-shadow:
          0em -2.6em 0em 0em rgba(216, 221, 228, 0.5),
          1.8em -1.8em 0 0em rgba(216, 221, 228, 0.7),
          2.5em 0em 0 0em var(--loader-secondary),
          1.75em 1.75em 0 0em rgba(216, 221, 228, 0.2),
          0em 2.5em 0 0em rgba(216, 221, 228, 0.2),
          -1.8em 1.8em 0 0em rgba(216, 221, 228, 0.2),
          -2.6em 0em 0 0em rgba(216, 221, 228, 0.2),
          -1.8em -1.8em 0 0em rgba(216, 221, 228, 0.2);
      }
      37.5% {
        box-shadow:
          0em -2.6em 0em 0em rgba(216, 221, 228, 0.2),
          1.8em -1.8em 0 0em rgba(216, 221, 228, 0.5),
          2.5em 0em 0 0em rgba(216, 221, 228, 0.7),
          1.75em 1.75em 0 0em var(--loader-secondary),
          0em 2.5em 0 0em rgba(216, 221, 228, 0.2),
          -1.8em 1.8em 0 0em rgba(216, 221, 228, 0.2),
          -2.6em 0em 0 0em rgba(216, 221, 228, 0.2),
          -1.8em -1.8em 0 0em rgba(216, 221, 228, 0.2);
      }
      50% {
        box-shadow:
          0em -2.6em 0em 0em rgba(216, 221, 228, 0.2),
          1.8em -1.8em 0 0em rgba(216, 221, 228, 0.2),
          2.5em 0em 0 0em rgba(216, 221, 228, 0.5),
          1.75em 1.75em 0 0em rgba(216, 221, 228, 0.7),
          0em 2.5em 0 0em var(--loader-secondary),
          -1.8em 1.8em 0 0em rgba(216, 221, 228, 0.2),
          -2.6em 0em 0 0em rgba(216, 221, 228, 0.2),
          -1.8em -1.8em 0 0em rgba(216, 221, 228, 0.2);
      }
      62.5% {
        box-shadow:
          0em -2.6em 0em 0em rgba(216, 221, 228, 0.2),
          1.8em -1.8em 0 0em rgba(216, 221, 228, 0.2),
          2.5em 0em 0 0em rgba(216, 221, 228, 0.2),
          1.75em 1.75em 0 0em rgba(216, 221, 228, 0.5),
          0em 2.5em 0 0em rgba(216, 221, 228, 0.7),
          -1.8em 1.8em 0 0em var(--loader-secondary),
          -2.6em 0em 0 0em rgba(216, 221, 228, 0.2),
          -1.8em -1.8em 0 0em rgba(216, 221, 228, 0.2);
      }
      75% {
        box-shadow:
          0em -2.6em 0em 0em rgba(216, 221, 228, 0.2),
          1.8em -1.8em 0 0em rgba(216, 221, 228, 0.2),
          2.5em 0em 0 0em rgba(216, 221, 228, 0.2),
          1.75em 1.75em 0 0em rgba(216, 221, 228, 0.2),
          0em 2.5em 0 0em rgba(216, 221, 228, 0.5),
          -1.8em 1.8em 0 0em rgba(216, 221, 228, 0.7),
          -2.6em 0em 0 0em var(--loader-secondary),
          -1.8em -1.8em 0 0em rgba(216, 221, 228, 0.2);
      }
      87.5% {
        box-shadow:
          0em -2.6em 0em 0em rgba(216, 221, 228, 0.2),
          1.8em -1.8em 0 0em rgba(216, 221, 228, 0.2),
          2.5em 0em 0 0em rgba(216, 221, 228, 0.2),
          1.75em 1.75em 0 0em rgba(216, 221, 228, 0.2),
          0em 2.5em 0 0em rgba(216, 221, 228, 0.2),
          -1.8em 1.8em 0 0em rgba(216, 221, 228, 0.5),
          -2.6em 0em 0 0em rgba(216, 221, 228, 0.7),
          -1.8em -1.8em 0 0em var(--loader-secondary) fff;
      }
    }
    `,
  },
  {
    id: 21,
    html: '<div class="loader21"></div>',
    css: `.loader21 {
      width: var(--loader-width);
      height: var(--loader-width);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      background: linear-gradient(0deg, rgba(255, 61, 0, 0.2) 33%, var(--loader-primary) 100%);
      box-sizing: border-box;
      animation: rotation21 var(--loader-speed) linear infinite;
    }
    .loader21::after {
      content: '';  
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(var(--loader-width) - 5px);
      height: calc(var(--loader-width) - 5px);
      border-radius: 50%;
      background: #263238;
    }
    @keyframes rotation21 {
      0% { transform: rotate(0deg) }
      100% { transform: rotate(360deg)}
    } `,
  },
  {
    id: 22,
    html: '<div class="loader22"></div>',
    css: `.loader22 {
      width: var(--loader-width);
      height: var(--loader-width);
      border-radius: 50%;
      display: inline-block;
      border-top: var(--loader-border) solid var(--loader-secondary);
      border-right: var(--loader-border) solid transparent;
      box-sizing: border-box;
      animation: rotation22 var(--loader-speed) linear infinite;
    }
    .loader22::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 0;
      width: var(--loader-width);
      height: var(--loader-width);
      border-radius: 50%;
      border-left: var(--loader-border) solid var(--loader-primary);
      border-bottom: var(--loader-border) solid transparent;
      animation: rotation22 0.5s linear infinite reverse;
    }
    @keyframes rotation22 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    `,
  },
  {
    id: 23,
    html: '<div class="loader23"></div>',
    css: `.loader23 {
      width: var(--loader-width);
      height: var(--loader-width);
      border: var(--loader-border) solid;
      border-color: var(--loader-primary) transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation23 var(--loader-speed) linear infinite;
    }
    
    @keyframes rotation23 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    } 
    `,
  },
  {
    id: 24,
    html: '<div class="loader24"></div>',
    css: `.loader24 {
      width: var(--loader-width);
      height: var(--loader-width);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      border: calc(var(--loader-border) + 5px) solid;
      border-color: rgba(216, 221, 228,0.15) rgba(216, 221, 228, 0.5)
        rgba(216, 221, 228, 0.6)  rgba(216, 221, 228, 0.8);
      box-sizing: border-box;
      animation: rotation24 var(--loader-speed) linear infinite;
    }
    
    @keyframes rotation24 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }     
    `,
  },
]
