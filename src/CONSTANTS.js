import { createCan, createBottle } from './utils/svgUtils';

export const COIN_CONFIG = {
  NICKEL: {
    id: 'NICKEL',
    value: 5,
    label: '5¢',
    svgColor: '#A0AEC0',
    displaySize: '40',
    btnBg: 'bg-neutral-300',
    btnHoverBg: 'hover:bg-neutral-400',
    btnFocusRing: 'focus:ring-neutral-500',
    btnTextColor: 'text-neutral-800',
  },
  DIME: {
    id: 'DIME',
    value: 10,
    label: '10¢',
    svgColor: '#CBD5E0',
    displaySize: '35',
    btnBg: 'bg-gray-300',
    btnHoverBg: 'hover:bg-gray-400',
    btnFocusRing: 'focus:ring-gray-500',
    btnTextColor: 'text-gray-800',
  },
  QUARTER: {
    id: 'QUARTER',
    value: 25,
    label: '25¢',
    svgColor: '#E2E8F0',
    displaySize: '45',
    btnBg: 'bg-slate-300',
    btnHoverBg: 'hover:bg-slate-400',
    btnFocusRing: 'focus:ring-slate-500',
    btnTextColor: 'text-slate-800',
  },
};

export const ORDERED_COIN_TYPES = ['QUARTER', 'DIME', 'NICKEL'];

export const COIN_VALUES = Object.fromEntries(
  ORDERED_COIN_TYPES.map((type) => [type, COIN_CONFIG[type].value]),
);

export const INITIAL_DEPOSITED_COINS = { QUARTER: 0, DIME: 0, NICKEL: 0 };

export const INITIAL_PRODUCTS = {
  COLA: {
    name: 'Cola',
    price: 25,
    stock: 10,
    svg: createCan('#E53E3E', 'COLA'),
    color: 'bg-red-500',
    textColor: 'text-red-100',
  },
  DIET_COLA: {
    name: 'Diet',
    price: 35,
    stock: 8,
    svg: createCan('#4A5568', 'DIET'),
    color: 'bg-gray-700',
    textColor: 'text-gray-100',
  },
  LIME_SODA: {
    name: 'Lime',
    price: 25,
    stock: 0,
    svg: createCan('#48BB78', 'LIME'),
    color: 'bg-green-500',
    textColor: 'text-green-100',
  },
  WATER: {
    name: 'H₂O',
    price: 45,
    stock: 2,
    svg: createBottle('#3182CE', 'H₂O'),
    color: 'bg-blue-600',
    textColor: 'text-blue-100',
  },
};
