import { cn, getApiUrl, formatCurrency } from './utils'

describe('utils', () => {

  describe('getApiUrl', () => {
    const originalEnv = process.env.NEXT_PUBLIC_API_URL
    afterEach(() => {
      process.env.NEXT_PUBLIC_API_URL = originalEnv
    })

    it('returns the URL when it is defined', () => {
      process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8080'
      expect(getApiUrl()).toBe('http://localhost:8080')
    })

    it.skip('throws an error when the variable is not defined.', () => {
      process.env.NEXT_PUBLIC_API_URL = undefined
      
      expect(() => getApiUrl()).toThrow(
        'La variable de entorno NEXT_PUBLIC_API_URL no está definida.'
      )
    })
  })

  describe('formatCurrency', () => {
    it('format a number to USD en-US without decimals', () => {
      expect(formatCurrency(150000)).toBe('$150,000')
      expect(formatCurrency(0)).toBe('$0')
    })

    it('returns N/A when the value is not a number', () => {
      expect(formatCurrency(NaN as unknown as number)).toBe('N/A')
    })
  })
})
