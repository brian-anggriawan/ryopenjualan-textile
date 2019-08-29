import Dashboard from "views/Dashboard/Dashboard";
import Jenisbiaya from 'views/Jenis_biaya/list_jenisbiaya';
import Pelanggan from 'views/Pelanggan/list_pelanggan';
import Pengeluaran from 'views/Pengeluaran/list_pengeluaran';
import Penjualan from 'views/Penjualan/list_penjualan';
import Petugas from 'views/Petugas Desain/list_petugasa';
import Supplier from 'views/Supplier/list_supplier';
import Tarif from 'views/Tarif_Jasa/list_tarif';
import Userlogin from 'views/user_login/list_user_login';
import Useraccess from 'views/user_access/list_user_access';
import satuan from 'views/satuan/list_satuan';
import kategori from 'views/kategori_produk/list_kategoriproduk';
import Userlevel from 'views/user_level/list_user_level';
import Report from 'views/Report/list_report';
import Auth from 'Auth';
import Hutang from 'views/hutang/list_hutang';
import Jenisbahan from 'views/jenis_bahan/jenis_bahan';
import DataPenjualan from 'views/data_penjualan/list_penjualan';
import Produksi from 'views/proses_produksi/list_proses_produksi';
import Retur from 'views/retur/retur';
import Pemasukkan from 'views/Pemasukkan/list_pemasukkan';


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Auth(Dashboard),
    layout: "/admin",
    group: 'Dashboard'
  },
  {
    path: "/pelanggan",
    name: "pelanggan",
    icon: "business_badge",
    component: Auth(Pelanggan),
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/supplier",
    name: "supplier",
    icon: "emoticons_satisfied",
    component: Auth(Supplier),
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/satuan",
    name: "Satuan",
    icon: "design-2_ruler-pencil",
    component: Auth(satuan),
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/kategorijasa",
    name: "Kategori Jasa",
    icon: "shopping_tag-content",
    component: Auth(kategori),
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/hargajasa",
    name: "Harga Jasa",
    icon: "business_money-coins",
    component: Auth(Tarif),
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/jenisbiaya",
    name: "Jenis Biaya",
    icon: "files_paper",
    component: Auth(Jenisbiaya),
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/petugas",
    name: "Petugas Desain",
    icon: "users_circle-08",
    component: Auth(Petugas),
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/jenisbahan",
    name: "Jenis Bahan",
    icon: "shopping_basket",
    component: Auth(Jenisbahan),
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/penjualan",
    name: "Penjualan",
    icon: "shopping_box",
    component: Auth(Penjualan),
    layout: "/admin",
    group: 'transaksi'
  },
  {
    path: "/datapenjualan",
    name: "Data Penjualan",
    icon: "education_paper",
    component: Auth(DataPenjualan),
    layout: "/admin",
    group: 'transaksi'
  },
  {
    path: "/retur",
    name: "Retur",
    icon: "arrows-1_refresh-69",
    component: Auth(Retur),
    layout: "/admin",
    group: 'transaksi'
  },
  {
    path: "/prosesproduksi",
    name: "Proses Produksi",
    icon: "ui-2_settings-90",
    component: Auth(Produksi),
    layout: "/admin",
    group: 'transaksi'
  },
  {
    path: "/hutang",
    name: "hutang",
    icon: "business_money-coins",
    component: Auth(Hutang),
    layout: "/admin",
    group: 'transaksi'
  },
  {
    path: "/pengeluaran",
    name: "Pengeluaran",
    icon: "shopping_cart-simple",
    component: Auth(Pengeluaran),
    layout: "/admin",
    group: 'transaksi'
  },
  {
    path: "/pemasukkan",
    name: "Pemasukkan",
    icon: "files_single-copy-04",
    component: Auth(Pemasukkan),
    layout: "/admin",
    group: 'transaksi'
  },
  {
    path: "/report",
    name: "report",
    icon: "shopping_cart-simple",
    component: Auth(Report),
    layout: "/admin",
    group: 'report'
  },
  {
    path: "/userlogin",
    name: "User Login",
    icon: "users_single-02",
    component: Auth(Userlogin),
    layout: "/admin",
    group: 'config'
  },
  {
    path: "/userlevel",
    name: "User Level",
    icon: "design_bullet-list-67",
    component: Auth(Userlevel),
    layout: "/admin",
    group: 'config'
  },
  {
    path: "/useraccess",
    name: "User Access",
    icon: "sport_user-run",
    component: Auth(Useraccess),
    layout: "/admin",
    group: 'config'
  }
];
export default dashRoutes;

