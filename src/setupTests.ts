// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "util";

// We need to polyfill these two because they weren't included in the testing DOM >:c
Object.assign(global, { TextDecoder, TextEncoder });
