import { styled } from '..'

export const SidebarContainer = styled('div', {
  height: '100vh',
  background: '$gray800',
  position: 'fixed',
  top: 0,
  right: 0,
  boxShadow: '-0.5rem 0 40px 10px rgba(0,0,0,.7)',
  zIndex: 100,
})

export const OverlayContainer = styled('div', {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  right: 0,
  top: 0,

  background: 'rgba(0,0,0,.25)',
})

export const CartSidebarHeader = styled('header', {
  strong: {
    fontSize: '$lg',
    color: '$white',
    display: 'block',
    marginBottom: '2rem',
  },
})

export const SidebarContent = styled('div', {
  width: '30rem',
  height: '100%',
  padding: '4.5rem 3rem 3rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const CartItem = styled('div', {
  display: 'grid',
  gridTemplateColumns: '6.375rem auto',
  gap: '1.25rem',

  '& ~ &': {
    marginTop: '1.5rem',
  },

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  img: {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    border: 0,
    outline: 0,
    borderRadius: 8,
  },

  'p, strong': {
    fontSize: '$md',
  },

  strong: {
    display: 'block',
    margin: '.5rem 0 1rem',
    color: '$gray100',
  },

  p: {
    color: '$gray300',
  },

  button: {
    border: 0,
    background: 'transparent',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '$green500',
    cursor: 'pointer',
  },
})

export const CartList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const CartSummary = styled('table', {
  '&, tbody': {
    width: '100%',
  },

  tr: {
    width: '100%',
    padding: '.25rem 0',
    color: '$gray100',

    display: 'flex',
    justifyContent: 'space-between',
  },

  'tr.amount': {
    fontSize: '1rem',
  },

  'td.itemsAmount': {
    fontSize: '$md',
    color: '$gray300',
  },

  'td.value': {
    fontSize: '$md',
  },

  'td.value strong.value': {
    fontSize: '$xl',
  },
})

export const ButtonCheckout = styled('button', {
  cursor: 'pointer',
  border: 0,
  width: '100%',
  padding: '1.25rem 7.75rem',
  marginTop: '3.5rem',
  borderRadius: 8,

  backgroundColor: '$green500',
  color: '$white',
  fontWeight: 'bold',
  fontSize: '$md',
})

export const CloseSidebar = styled('button', {
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
  border: 0,
  lineHeight: 0,
  backgroundColor: 'transparent',
  cursor: 'pointer',

  svg: {
    color: '#8D8D99',
  },
})
