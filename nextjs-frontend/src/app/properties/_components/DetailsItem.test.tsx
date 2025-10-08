import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import DetailsItem from './DetailsItem'

describe('DetailsItem', () => {
  it('render the label and value', () => {
    render(<DetailsItem label='Owner' value='John Doe' />)

    expect(screen.getByText('Owner')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('supports empty values without breaking', () => {
    render(<DetailsItem label='' value='' />)

    // Ambos spans existen aunque estén vacíos
    // Buscamos por rol/texto genérico; cuando vacío, verificamos que el componente no lance errores
    expect(screen.getByTestId('details-item-container')).toBeInTheDocument()
  })

  it('render multiple instances independently', () => {
    render(
      <div>
        <DetailsItem label='A' value='1' />
        <DetailsItem label='B' value='2' />
      </div>
    )

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
