import { styled } from '..'

export const HeaderContainer = styled('header', {
  padding: '2rem 0 4rem',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CartButton = styled('button', {
  border: 'none',
  borderRadius: 6,
  background: '$gray800',
  position: 'relative',

  width: '3rem',
  height: '3rem',
  lineHeight: 0,

  cursor: 'pointer',

  svg: {
    color: '$gray300',
  },

  span: {
    position: 'absolute',
    background: '$green500',
    padding: '.75rem .5625rem',
    borderRadius: 9999,
    fontWeight: 'bold',
    color: '$white',
    lineHeight: 0,
    right: 0,
    top: 0,
    transform: 'translate(30%, -30%)',
  },
})
