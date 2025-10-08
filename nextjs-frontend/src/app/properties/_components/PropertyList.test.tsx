import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import PropertyList from './PropertyList'
import { Property } from '@/types/property'

vi.mock('./PropertyItem', () => ({
  __esModule: true,
  default: ({ property }: { property: Property }) => (
    <div data-testid={`property-item-${property.id}`}>{property.name}</div>
  ),
}))

function makeProperty(id: number, overrides: Partial<Property> = {}): Property {
  return {
    id,
    name: `House ${id}`,
    address: `${id} Main St`,
    price: 100000 + id,
    code: `INT-${id}`,
    year: 2020,
    ownerDetails: {
      name: 'Owner',
      address: 'Somewhere',
      birthday: '1990-01-01',
      photo: '',
    },
    image: {
      fileUrl: '',
      enabled: true,
    },
    trace: [],
    ...overrides,
  }
}

describe('PropertyList', () => {
  it('render property list when there are elements', async () => {
    const properties = [makeProperty(1), makeProperty(2), makeProperty(3)]
    render(await PropertyList({ properties }))

    expect(screen.getByTestId('property-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('property-item-2')).toBeInTheDocument()
    expect(screen.getByTestId('property-item-3')).toBeInTheDocument()
    expect(screen.queryByText('No properties found')).not.toBeInTheDocument()
  })

  it('render placeholder when there are no properties', async () => {
    render(await PropertyList({ properties: [] }))
    expect(screen.getByText('No properties found')).toBeInTheDocument()
  })
})
