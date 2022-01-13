import React from 'react';
import { IPCIndicator } from './IPCIndicator.service';

const withFetch = () => {
  return IPCIndicator.get()
    .then(response => response.json())
    .then(res => res);
}

const unmockedFetch = global.fetch

afterAll(() => {
  global.fetch = unmockedFetch
})

describe('withFetch', () => {
  test('works', async () => {
    const json = await withFetch();
    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toBeGreaterThan(0);
  })
})