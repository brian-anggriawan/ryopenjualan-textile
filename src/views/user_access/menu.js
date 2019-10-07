let Menu = [
    {
      path: "/pelanggan",
      name: "pelanggan",
      icon: "business_badge",
      component: 'Auth(Pelanggan)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/supplier",
      name: "supplier",
      icon: "emoticons_satisfied",
      component: 'Auth(Supplier)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/satuan",
      name: "Satuan",
      icon: "design-2_ruler-pencil",
      component: 'Auth(satuan)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/kategorijasa",
      name: "Kategori Jasa",
      icon: "shopping_tag-content",
      component: 'Auth(kategori)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/hargajasa",
      name: "Harga Jasa",
      icon: "business_money-coins",
      component: 'Auth(Tarif)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/jenisbiaya",
      name: "Jenis Biaya",
      icon: "files_paper",
      component: 'Auth(Jenisbiaya)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/petugas",
      name: "Petugas Desain",
      icon: "users_circle-08",
      component: 'Auth(Petugas)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/jenisbahan",
      name: "Jenis Bahan",
      icon: "shopping_basket",
      component: 'Auth(Jenisbahan)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/penjualan",
      name: "Penjualan",
      icon: "shopping_box",
      component: 'Auth(Penjualan)',
      layout: "/admin",
      group: 'transaksi'
    },
    {
      path: "/datapenjualan",
      name: "Data Penjualan",
      icon: "education_paper",
      component: 'Auth(DataPenjualan)',
      layout: "/admin",
      group: 'transaksi'
    },
    {
      path: "/retur",
      name: "Retur",
      icon: "arrows-1_refresh-69",
      component: 'Auth(Retur)',
      layout: "/admin",
      group: 'transaksi'
    },
    {
      path: "/prosesproduksi",
      name: "Proses Produksi",
      icon: "ui-2_settings-90",
      component: 'Auth(Produksi)',
      layout: "/admin",
      group: 'transaksi'
    },
    {
      path: "/hutang",
      name: "hutang",
      icon: "business_money-coins",
      component: 'Auth(Hutang)',
      layout: "/admin",
      group: 'transaksi'
    },
    {
      path: "/pengeluaran",
      name: "Pengeluaran",
      icon: "shopping_cart-simple",
      component: 'Auth(Pengeluaran)',
      layout: "/admin",
      group: 'transaksi'
    },
    {
      path: "/pemasukkan",
      name: "Pemasukkan",
      icon: "files_single-copy-04",
      component: 'Auth(Pemasukkan)',
      layout: "/admin",
      group: 'transaksi'
    },
    {
      path: "/userlogin",
      name: "User Login",
      icon: "users_single-02",
      component: 'Auth(Userlogin)',
      layout: "/admin",
      group: 'config'
    },
    {
      path: "/userlevel",
      name: "User Level",
      icon: "design_bullet-list-67",
      component: 'Auth(Userlevel)',
      layout: "/admin",
      group: 'config'
    },
    {
      path: "/useraccess",
      name: "User Access",
      icon: "sport_user-run",
      component: 'Auth(Useraccess)',
      layout: "/admin",
      group: 'config'
    },
    {
      path: "/report1",
      name: "Laporan Pengeluaran Biaya",
      group: 'report',
      component:'Laporan_pengeluaran_biaya',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report2",
      name: "Laporan Penjualan Detail",
      group: 'report',
      component:'Laporan_penjualan_detail',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report3",
      name: "Laporan Penjualan Jasa",
      group: 'report',
      component:'Laporan_penjualan_jasa',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report4",
      name: "Laporan Penjualan Jenis",
      group: 'report',
      component:'Laporan_penjualan_jenis',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report5",
      name: "Laporan Penjualan Pelanggan",
      group: 'report',
      component:'Laporan_penjualan_pelanggan',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report6",
      name: "Laporan Penjualan Tanggal",
      group: 'report',
      component:'Laporan_penjualan_tanggal',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report7",
      name: "Rekap Nota Penjualan",
      group: 'report',
      component:'Rekap_nota_penjualan',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report8",
      name: "Rekap Pengeluaran",
      group: 'report',
      component:'Rekap_pengeluaran',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report9",
      name: "Rekap Nota Penjualan Belum Lunas",
      group: 'report',
      component:'Rekap_nota_penjualan_belum_lunas',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report10",
      name: "Laporan Penjualan Per Nota",
      group: 'report',
      component:'laporan_penjualan_nota',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report11",
      name: "Laporan Pelunasan",
      group: 'report',
      component:'laporan_pelunasan',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report12",
      name: "Laporan Jasa Desain",
      group: 'report',
      component:'laporan_jasa_desain',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report13",
      name: "Laporan Pengeluaran Biaya Detail",
      group: 'report',
      component:'Laporan_pengeluaran_biaya_detail',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report14",
      name: "Laporan Metode Pembayaran",
      group: 'report',
      component:'laporan_metode_pembayaran',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report15",
      name: "Laporan Proses Produksi",
      group: 'report',
      component:'laporan_proses_produksi',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report16",
      name: "Laporan Retur",
      group: 'report',
      component:'Laporan_retur',
      icon: "sport_user-run",
      layout: "/admin",
    },
    {
      path: "/report17",
      name: "Laporan Jenis Bahan",
      group: 'report',
      component:'Laporan_jenis_bahan',
      icon: "sport_user-run",
      layout: "/admin",
    }
  ];
  export default Menu;
  