export interface CurrencyBulkInput {
  code: string;
  name: string;
  symbol: string;
}

export const currencies: CurrencyBulkInput[] = [
  {
    code: "JPY",
    name: "yen",
    symbol: "¥",
  },
  {
    code: "KRW",
    name: "won",
    symbol: "₩",
  },
  {
    code: "CNY",
    name: "yuan",
    symbol: "¥",
  },
  {
    code: "USD",
    name: "dollar",
    symbol: "$",
  },
  {
    code: "AUD",
    name: "dollar",
    symbol: "$",
  },
  {
    code: "SGD",
    name: "dollar",
    symbol: "S$",
  },
  {
    code: "HKD",
    name: "dollar",
    symbol: "$",
  },
  {
    code: "THB",
    name: "baht",
    symbol: "฿",
  },
  {
    code: "IDR",
    name: "rupiah",
    symbol: "Rp",
  },
  {
    code: "VND",
    name: "dong",
    symbol: "₫",
  },
  {
    code: "GBP",
    name: "sterling",
    symbol: "£",
  },
];
