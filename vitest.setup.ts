import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Testing Library only installs its own afterEach hook when the test globals are
// exposed. They are not, so unmounting between tests has to be wired explicitly -
// without this, renders accumulate and a query returns the previous test's DOM.
afterEach(cleanup)
