const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

const groceryProducts = [
  { name: 'Sunpride Pisang Cavendish', price: '15000', stocks: 20 },
  { name: 'Sunpride Apel Fuji', price: '25000', stocks: 15 },
  { name: 'Greenfields Susu UHT 1L', price: '18000', stocks: 30 },
  { name: 'Indomilk Susu Full Cream 1L', price: '17000', stocks: 25 },
  { name: 'Sari Roti Roti Tawar Kupas', price: '14000', stocks: 40 },
  { name: 'Sari Roti Roti Gandum', price: '16000', stocks: 35 },
  { name: 'Minute Maid Pulpy Orange 350ml', price: '8000', stocks: 50 },
  { name: 'Frestea Green Tea 500ml', price: '7000', stocks: 45 },
  { name: 'Tehbotol Sosro 350ml', price: '6000', stocks: 60 },
  { name: 'Ultra Milk Coklat 200ml', price: '5000', stocks: 70 },
  { name: 'Indomie Mi Goreng Original', price: '3500', stocks: 200 },
  { name: 'Indomie Mi Goreng Rendang', price: '3500', stocks: 180 },
  { name: 'Mie Sedaap Cup Soto', price: '4500', stocks: 120 },
  { name: 'Energen Cereal Kacang Hijau', price: '3000', stocks: 90 },
  { name: 'Nestle Koko Krunch 330g', price: '42000', stocks: 25 },
  { name: 'Lays Potato Chips Original 68g', price: '15000', stocks: 40 },
  { name: 'Qtela Keripik Singkong Balado', price: '12000', stocks: 50 },
  { name: 'Tango Wafer Coklat 130g', price: '10000', stocks: 60 },
  { name: 'Roma Marie Susu 240g', price: '9000', stocks: 80 },
  { name: 'Good Time Cookies Coklat 72g', price: '8000', stocks: 70 },
  { name: 'CP Ayam Fillet Dada 1kg', price: '55000', stocks: 15 },
  { name: 'So Good Nugget Ayam 400g', price: '38000', stocks: 20 },
  { name: 'Fiesta Nugget Ayam 500g', price: '45000', stocks: 18 },
  { name: 'Belfoods Sosis Ayam 500g', price: '35000', stocks: 25 },
  { name: 'Champ Sosis Sapi 1kg', price: '60000', stocks: 10 },
  { name: 'GoldStar Daging Sapi Slice 500g', price: '80000', stocks: 12 },
  { name: 'Norwegian Salmon Fillet 250g', price: '90000', stocks: 8 },
  { name: 'Finna Udang Beku 250g', price: '75000', stocks: 10 },
  { name: 'ABC Kecap Manis 520ml', price: '18000', stocks: 40 },
  { name: 'Bango Kecap Manis 275ml', price: '16000', stocks: 35 },
  { name: 'ABC Saus Sambal 335ml', price: '15000', stocks: 30 },
  { name: 'Heinz Saus Tomat 300g', price: '20000', stocks: 25 },
  { name: 'Blue Band Margarine 200g', price: '12000', stocks: 50 },
  { name: 'Anchor Butter Salted 227g', price: '45000', stocks: 20 },
  { name: 'Prochiz Keju Cheddar 170g', price: '23000', stocks: 35 },
  { name: 'Kraft Keju Slice 10s', price: '28000', stocks: 25 },
  { name: 'Skippy Peanut Butter 340g', price: '50000', stocks: 15 },
  { name: 'Nutella Hazelnut Spread 350g', price: '75000', stocks: 10 },
  { name: 'Indocafe Coffeemix 3in1 10s', price: '15000', stocks: 60 },
  { name: 'Torabika Cappuccino 10s', price: '17000', stocks: 55 },
  { name: 'Good Day Cappuccino Sachet', price: '2000', stocks: 100 },
  { name: 'Aqua Air Mineral 1.5L', price: '6000', stocks: 90 },
  { name: 'Le Minerale Air Mineral 600ml', price: '4000', stocks: 100 },
  { name: 'Vit Air Mineral 330ml', price: '3000', stocks: 120 },
  { name: 'Maknyuss Beras Pandan Wangi 5kg', price: '65000', stocks: 25 },
  { name: 'Rojo Lele Beras Premium 5kg', price: '68000', stocks: 20 },
  { name: 'Rose Brand Tepung Terigu 1kg', price: '12000', stocks: 70 },
  { name: 'Gulaku Gula Pasir 1kg', price: '14000', stocks: 65 },
  { name: 'Dua Kelinci Kacang Oven 500g', price: '30000', stocks: 40 },
  { name: 'Garuda Kacang Kulit 500g', price: '28000', stocks: 35 },
];

async function main() {
  await prisma.product.createMany({
    data: groceryProducts,
  });
}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
