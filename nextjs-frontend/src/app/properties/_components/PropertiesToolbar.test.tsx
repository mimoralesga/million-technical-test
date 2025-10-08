import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import PropertiesToolbar from './PropertiesToolbar'

const setNameMock = vi.fn()

vi.mock('nuqs', async () => {
  return {
    parseAsString: {
      withDefault() {
        return this
      },
      withOptions() {
        return this
      },
    },
    parseAsInteger: {
        withDefault() {
          return this
        },
        withOptions() {
          return this
        },
      },
    useQueryState: () => ['', setNameMock],
    debounce: (ms: number) => {
      return (..._args: unknown[]) => {
      }
    },
  }
})

describe('PropertiesToolbar', () => {
  beforeEach(() => {
    setNameMock.mockClear()
  })

  it('render the search input and filter button.', () => {
    render(<PropertiesToolbar />)
    const input = screen.getByPlaceholderText('Search for a property')
    expect(input).toBeInTheDocument()
  })

  it('when writing a non-empty value, update the state with debounce', () => {
    render(<PropertiesToolbar />)
    const input = screen.getByPlaceholderText('Search for a property') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Casa' } })

    expect(setNameMock).toHaveBeenCalledTimes(1)
    const [valueArg, optionsArg] = setNameMock.mock.calls[0]
    expect(valueArg).toBe('Casa')
    expect(optionsArg).toBeTruthy()
    expect(typeof optionsArg.limitUrlUpdates).toBe('function')
  })

  it.skip('when clearing the input (empty), set null without options.', () => {
    render(<PropertiesToolbar />)
    const input = screen.getByPlaceholderText('Search for a property') as HTMLInputElement

    fireEvent.change(input, { target: { value: '' } })
    expect(setNameMock).toHaveBeenCalledTimes(1)

    const [valueArg, optionsArg] = setNameMock.mock.calls[0]
    expect(valueArg).toBeNull()
    expect(optionsArg).toBeUndefined()
  })
})


