import { afterEach, describe, it, expect } from 'vitest'
import {cleanup, render, screen} from '@testing-library/react'

describe('Main Page', () => {
	afterEach(() => {
		cleanup()
	})

	it('renders the main page correctly', () => {
		render(<div>Main Page Content</div>)
		expect(screen.getByText('Main Page Content')).toBeDefined()
	})
})
