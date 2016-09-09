import parse from './parseCSV'

it('Should parse 2 lines of CSV data', () => {
  const sampleText = `
    name,age,hat
    bob,42,top
  `
  const expected = [{
    name: 'bob',
    age: 42,
    hat: 'top',
  }]
  const actual = parse(sampleText)
  expect(actual).toEqual(expected)
})

it('Should transform records with the transform option', () => {
  const sampleText = `
    country,currency,continent
    Thailand,baht,Asia
    Mexico,peso,North America
  `
  const transform = obj => {
    const { country, ...rest } = obj
    return {
      ...rest,
      countryName: country,
    }
  }
  const expected = [{
    countryName: 'Thailand',
    currency: 'baht',
    continent: 'Asia',
  }, {
    countryName: 'Mexico',
    currency: 'peso',
    continent: 'North America',
  }]
  const actual = parse(sampleText, { transform })
  expect(actual).toEqual(expected)
})
