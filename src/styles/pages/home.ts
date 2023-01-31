import { styled } from '..'

export const SliderContainer = styled('div', {
  display: 'relative',
  width: '100%',
  '*.arrow': {
    width: '30px',
    height: '30px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    '-webkit-transform': 'translateY(-50%)',
    fill: '#fff',
    cursor: 'pointer',
    zIndex: 1,
  },
  '*.arrow--left': {
    left: 6,
  },
  '*.arrow--right': {
    left: 'auto',
    right: 5,
  },
  '*.arrow--disabled': {
    fill: 'rgba(255,255,255,0)',
  },
})

export const HomeContainer = styled('main', {
  minHeight: 656,
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  minWidth: 540,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    cursor: 'context-menu',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    color: '$gray100',
    backgroundColor: 'rgba(0,0,0,0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
      fontWeight: 'bold',
      color: '$gray100',
    },

    span: {
      color: '$green300',
      fontWeight: 'bold',
      fontSize: '$xl',
    },

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

export const AddToCartButton = styled('button', {
  width: '3.5rem',
  height: '3.5rem',
  background: '$green500',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',

  svg: {
    pointerEvents: 'none',
  },
})
