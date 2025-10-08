import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import OwnerSection from './OwnerSection'
import { PropertyOwner } from '@/types/property-owner'

function makeOwner(overrides: Partial<PropertyOwner> = {}): PropertyOwner {
  return {
    name: 'Jane Doe',
    address: '123 Main St',
    birthday: '1990-01-15',
    photo: '',
    ...overrides,
  }
}

describe('OwnerSection', () => {
  it('render the title and all fields', () => {
    const owner = makeOwner()
    render(<OwnerSection owner={owner} />)

    expect(screen.getByText('Owner')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Address')).toBeInTheDocument()
    expect(screen.getByText('Birthday')).toBeInTheDocument()

    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('123 Main St')).toBeInTheDocument()

    const expectedDate = new Date(owner.birthday).toDateString()
    expect(screen.getByText(expectedDate)).toBeInTheDocument()
  })

  it('formats birthday with toDateString based on provided ISO date', () => {
    const birthday = '2000-12-31'
    const owner = makeOwner({ birthday })
    render(<OwnerSection owner={owner} />)

    const expectedDate = new Date(birthday).toDateString()
    expect(screen.getByText(expectedDate)).toBeInTheDocument()
  })
})
