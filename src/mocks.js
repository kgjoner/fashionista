export const mockSizes = [
  {available: false, size: "PP", sku: "5807_343_0_PP"},
  {available: true, size: "P", sku: "5807_343_0_P"},
  {available: true, size: "M", sku: "5807_343_0_M"},
  {available: true, size: "G", sku: "5807_343_0_G"},
  {available: false, size: "GG", sku: "5807_343_0_GG"}
]

export const mockProduct = {
  name: "VESTIDO TRANSPASSE BOW",
  code_color: "20002605_613",
  color_slug: "tapecaria",
  color: "TAPEÇARIA",
  on_sale: false,
  regular_price: "R$ 199,90",
  actual_price: "R$ 199,90",
  discount_percentage: "",
  installments: "3x R$ 66,63",
  image: "https://picsum.photos/200/300",
  sizes: mockSizes
}

export const mockProducts = [
  mockProduct,
  {
    name: "VESTIDO FRANZIDO RECORTES",
    code_color: "20001609_029",
    color_slug: "preto",
    color: "PRETO",
    on_sale: true,
    regular_price: "R$ 139,90",
    actual_price: "R$ 69,90",
    discount_percentage: "50%",
    installments: "2x R$ 34,95",
    image: "https://viniciusvinna.netlify.app/assets/api-fashionista/20001609_002_catalog_1.jpg",
    sizes: [
        {
          available: true,
          size: "PP",
          sku: "3627_40130843_0_PP"
        },
        {
          available: true,
          size: "P",
          sku: "3627_40130843_0_P"
        },
        {
          available: true,
          size: "M",
          sku: "3627_40130843_0_M"
        },
        {
          available: false,
          size: "G",
          sku: "3627_40130843_0_G"
        },
        {
          available: false,
          size: "GG",
          sku: "3627_40130843_0_GG"
        }
    ]
  },
]

export const mockSelectedProduct = {
  name: "VESTIDO TRANSPASSE BOW",
  size: "P",
  actual_price: "R$ 199,90",
  installments: "3x R$ 66,63",
  image: "https://picsum.photos/200/300",
}

export const mockCart = [
  {
    name: "VESTIDO TRANSPASSE BOW",
    size: "P",
    quantity: 2,
    actual_price: "R$ 199,90",
    installments: "3x R$ 66,63",
    image: "https://picsum.photos/200/300",
  }
]

export const cartValues = {
  quantity: 2,
  subtotal:"R$ 399,80"
}

export const mockError = {
  name: 'No Size',
  message: 'Selecione um tamanho'
}

export const mockSuccess = 'Produto adicionado!'