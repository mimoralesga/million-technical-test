test("DetailsSection", () => {});
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import DetailsSection from './DetailsSection'
import { Property } from '@/types/property'

function makeProperty(overrides: Partial<Property> = {}): Property {
  return {
    id: 1,
    name: 'Cozy House',
    address: '123 Main St',
    price: 150000,
    code: 'INT-001',
    year: 2020,
    ownerDetails: {
      name: 'Jane Doe',
      address: '123 Main St',
      birthday: '1990-01-01',
      photo: '',
    },
    image: {
      fileUrl: 'house.webp',
      enabled: true,
    },
    trace: [],
    ...overrides,
  }
}

describe('DetailsSection', () => {
  it('Render the title and all fields.', () => {
    const property = makeProperty()
    render(<DetailsSection property={property} />)

    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Address')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByText('Code Internal')).toBeInTheDocument()
    expect(screen.getByText('Year')).toBeInTheDocument()

    expect(screen.getByText('Cozy House')).toBeInTheDocument()
    expect(screen.getByText('123 Main St')).toBeInTheDocument()
    // 150000 en-US sin fracciones → $150,000
    expect(screen.getByText('$150,000')).toBeInTheDocument()
    expect(screen.getByText('INT-001')).toBeInTheDocument()
    expect(screen.getByText('2020')).toBeInTheDocument()
  })

  it('format the price with US local currency and no decimals', () => {
    const property = makeProperty({ price: 9876543 })
    render(<DetailsSection property={property} />)
    expect(screen.getByText('$9,876,543')).toBeInTheDocument()
  })
})