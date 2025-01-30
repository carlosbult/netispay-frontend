export interface Payment {
  id: string;
  moneda: 'VES' | 'USD';
  monto: number;
  banco: string;
  productoBancario: string;
  cliente: string;
  fecha: string;
  estado: 'exitosa' | 'error' | 'procesando';
  detalles?: {
    idOperacion: string;
    nombreCliente: string;
    verificacionCuenta?: boolean;
  };
}

const nombres = [
  'José',
  'María',
  'Juan',
  'Ana',
  'Carlos',
  'Laura',
  'Pedro',
  'Carmen',
  'Miguel',
  'Isabel',
  'Francisco',
  'Patricia',
];

const apellidos = [
  'Rodríguez',
  'González',
  'Pérez',
  'Martínez',
  'García',
  'López',
  'Sánchez',
  'Díaz',
  'Torres',
  'Ruiz',
  'Ramírez',
  'Flores',
];

const bancos = [
  'Banesco',
  'Zelle',
  'Binance',
  'Provincial',
  'Mercantil',
  'Venezuela',
  'BOD',
  'BNC',
];

const productosBancarios = [
  'Boton de pago',
  'Account verifyier',
  'Binance Pay',
  'Pago móvil',
  'Transferencia',
  'P2P',
];

function generarIdUnico(): string {
  return Math.random().toString(36).substring(2, 9);
}

function obtenerElementoAleatorio<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generarMontoAleatorio(moneda: 'VES' | 'USD'): number {
  if (moneda === 'VES') {
    return Math.floor(Math.random() * 100) + 100;
  }
  return Math.floor(Math.random() * 100) + 10;
}

function generarFechaAleatoria(): string {
  const inicio = new Date('2024-01-20').getTime();
  const fin = new Date('2024-02-09').getTime();
  const fechaAleatoria = new Date(inicio + Math.random() * (fin - inicio));
  return fechaAleatoria.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

export function generarPagosAleatorios(cantidad: number): Payment[] {
  const pagos: Payment[] = [];

  for (let i = 0; i < cantidad; i++) {
    const moneda = Math.random() > 0.3 ? 'VES' : 'USD';
    const estado = Math.random() > 0.95 ? 'error' : 'exitosa';

    const pago: Payment = {
      id: generarIdUnico(),
      moneda,
      monto: generarMontoAleatorio(moneda),
      banco: obtenerElementoAleatorio(bancos),
      productoBancario: obtenerElementoAleatorio(productosBancarios),
      cliente: Math.floor(Math.random() * 90000 + 1000).toString(),
      fecha: generarFechaAleatoria(),
      estado,
      detalles: {
        idOperacion: '#' + Math.floor(Math.random() * 100000).toString(),
        nombreCliente: `${obtenerElementoAleatorio(nombres)} ${obtenerElementoAleatorio(apellidos)}`,
        verificacionCuenta: Math.random() > 0.1,
      },
    };

    pagos.push(pago);
  }

  return pagos;
}

// Generar 100 pagos aleatorios
export const payments: Payment[] = generarPagosAleatorios(1657);

export interface Client {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended';
  services: number;
  cutoffDate: string;
}
