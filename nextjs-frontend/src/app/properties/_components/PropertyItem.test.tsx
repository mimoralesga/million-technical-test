import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import PropertyItem from './PropertyItem'
import { Property } from '@/types/property'

// Mock de next/link para tests (renderiza un anchor simple)
vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

function makeProperty(overrides: Partial<Property> = {}): Property {
  return {
    id: 10,
    name: 'Modern Loft',
    address: '456 Broadway Ave',
    price: 250000,
    code: 'INT-010',
    year: 2018,
    ownerDetails: {
      name: 'Alice',
      address: '456 Broadway Ave',
      birthday: '1992-05-05',
      photo: '',
    },
    image: {
      fileUrl: 'https://example.com/loft.webp',
      enabled: true,
    },
    trace: [],
    ...overrides,
  }
}

describe('PropertyItem', () => {
  it('render formatted price, name, and address', () => {
    const property = makeProperty({ price: 123456 })
    render(<PropertyItem property={property} />)

    expect(screen.getByText('$123,456')).toBeInTheDocument()
    expect(screen.getByText('Modern Loft')).toBeInTheDocument()
    expect(screen.getByText('456 Broadway Ave')).toBeInTheDocument()
  })

  it('use the image from the property when it exists', () => {
    const property = makeProperty()
    render(<PropertyItem property={property} />)
    const img = screen.getByAltText('Property Image') as HTMLImageElement
    expect(img.src).toBe('https://example.com/loft.webp')
  })

  it('use placeholder when there is no image.fileUrl', () => {
    const property = makeProperty({ image: { fileUrl: undefined as unknown as string, enabled: true } })
    render(<PropertyItem property={property} />)
    const img = screen.getByAltText('Property Image') as HTMLImageElement
    expect(img.src).toBe('https://placehold.co/600x400')
  })

  it('links to the details route using the id', () => {
    const property = makeProperty({ id: 99 })
    render(<PropertyItem property={property} />)
    const link = screen.getByRole('link') as HTMLAnchorElement
    expect(link.getAttribute('href')).toBe('/properties/99')
  })
})
