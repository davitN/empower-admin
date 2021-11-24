import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';

const ddd = {
  data: [
    {
      id: 1000,
      name: 'James Butt',
      country: {
        name: 'Algeria',
        code: 'dz',
      },
      company: 'Benton, John B Jr',
      date: '2015-09-13',
      status: 'unqualified',
      verified: true,
      activity: 17,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
      },
      balance: 70663,
    },
    {
      id: 1001,
      name: 'Josephine Darakjy',
      country: {
        name: 'Egypt',
        code: 'eg',
      },
      company: 'Chanay, Jeffrey A Esq',
      date: '2019-02-09',
      status: 'proposal',
      verified: true,
      activity: 0,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png',
      },
      balance: 82429,
    },
    {
      id: 1002,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
    {
      id: 1003,
      name: 'Lenna Paprocki',
      country: {
        name: 'Slovenia',
        code: 'si',
      },
      company: 'Feltz Printing Service',
      date: '2020-09-15',
      status: 'new',
      verified: false,
      activity: 37,
      representative: {
        name: 'Xuxue Feng',
        image: 'xuxuefeng.png',
      },
      balance: 88521,
    },
    {
      id: 1004,
      name: 'Donette Foller',
      country: {
        name: 'South Africa',
        code: 'za',
      },
      company: 'Printing Dimensions',
      date: '2016-05-20',
      status: 'proposal',
      verified: true,
      activity: 33,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 93905,
    },
    {
      id: 1005,
      name: 'Simona Morasca',
      country: {
        name: 'Egypt',
        code: 'eg',
      },
      company: 'Chapman, Ross E Esq',
      date: '2018-02-16',
      status: 'qualified',
      verified: false,
      activity: 68,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      balance: 50041,
    },
    {
      id: 1006,
      name: 'Mitsue Tollner',
      country: {
        name: 'Paraguay',
        code: 'py',
      },
      company: 'Morlong Associates',
      date: '2018-02-19',
      status: 'renewal',
      verified: true,
      activity: 54,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      balance: 58706,
    },
    {
      id: 1007,
      name: 'Leota Dilliard',
      country: {
        name: 'Serbia',
        code: 'rs',
      },
      company: 'Commercial Press',
      date: '2019-08-13',
      status: 'renewal',
      verified: true,
      activity: 69,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      balance: 26640,
    },
    {
      id: 1008,
      name: 'Sage Wieser',
      country: {
        name: 'Egypt',
        code: 'eg',
      },
      company: 'Truhlar And Truhlar Attys',
      date: '2018-11-21',
      status: 'unqualified',
      verified: true,
      activity: 76,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      balance: 65369,
    },
    {
      id: 1009,
      name: 'Kris Marrier',
      country: {
        name: 'Mexico',
        code: 'mx',
      },
      company: 'King, Christopher A Esq',
      date: '2015-07-07',
      status: 'proposal',
      verified: false,
      activity: 3,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      balance: 63451,
    },
    {
      id: 1010,
      name: 'Minna Amigon',
      country: {
        name: 'Romania',
        code: 'ro',
      },
      company: 'Dorl, James J Esq',
      date: '2018-11-07',
      status: 'qualified',
      verified: false,
      activity: 38,
      representative: {
        name: 'Anna Fali',
        image: 'annafali.png',
      },
      balance: 71169,
    },
    {
      id: 1011,
      name: 'Abel Maclead',
      country: {
        name: 'Singapore',
        code: 'sg',
      },
      company: 'Rangoni Of Florence',
      date: '2017-03-11',
      status: 'qualified',
      verified: true,
      activity: 87,
      representative: {
        name: 'Bernardo Dominic',
        image: 'bernardodominic.png',
      },
      balance: 96842,
    },
    {
      id: 1012,
      name: 'Kiley Caldarera',
      country: {
        name: 'Serbia',
        code: 'rs',
      },
      company: 'Feiner Bros',
      date: '2015-10-20',
      status: 'unqualified',
      verified: false,
      activity: 80,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      balance: 92734,
    },
    {
      id: 1013,
      name: 'Graciela Ruta',
      country: {
        name: 'Chile',
        code: 'cl',
      },
      company: 'Buckley Miller & Wright',
      date: '2016-07-25',
      status: 'negotiation',
      verified: false,
      activity: 59,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png',
      },
      balance: 45250,
    },
    {
      id: 1014,
      name: 'Cammy Albares',
      country: {
        name: 'Philippines',
        code: 'ph',
      },
      company: 'Rousseaux, Michael Esq',
      date: '2019-06-25',
      status: 'new',
      verified: true,
      activity: 90,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 30236,
    },
    {
      id: 1015,
      name: 'Mattie Poquette',
      country: {
        name: 'Venezuela',
        code: 've',
      },
      company: 'Century Communications',
      date: '2017-12-12',
      status: 'negotiation',
      verified: false,
      activity: 52,
      representative: {
        name: 'Anna Fali',
        image: 'annafali.png',
      },
      balance: 64533,
    },
    {
      id: 1016,
      name: 'Meaghan Garufi',
      country: {
        name: 'Malaysia',
        code: 'my',
      },
      company: 'Bolton, Wilbur Esq',
      date: '2018-07-04',
      status: 'unqualified',
      verified: false,
      activity: 31,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      balance: 37279,
    },
    {
      id: 1017,
      name: 'Gladys Rim',
      country: {
        name: 'Netherlands',
        code: 'nl',
      },
      company: 'T M Byxbee Company Pc',
      date: '2020-02-27',
      status: 'renewal',
      verified: true,
      activity: 48,
      representative: {
        name: 'Stephen Shaw',
        image: 'stephenshaw.png',
      },
      balance: 27381,
    },
    {
      id: 1018,
      name: 'Yuki Whobrey',
      country: {
        name: 'Israel',
        code: 'il',
      },
      company: 'Farmers Insurance Group',
      date: '2017-12-21',
      status: 'negotiation',
      verified: true,
      activity: 16,
      representative: {
        name: 'Bernardo Dominic',
        image: 'bernardodominic.png',
      },
      balance: 9257,
    },
    {
      id: 1019,
      name: 'Fletcher Flosi',
      country: {
        name: 'Argentina',
        code: 'ar',
      },
      company: 'Post Box Services Plus',
      date: '2016-01-04',
      status: 'renewal',
      verified: true,
      activity: 19,
      representative: {
        name: 'Xuxue Feng',
        image: 'xuxuefeng.png',
      },
      balance: 67783,
    },
    {
      id: 1020,
      name: 'Bette Nicka',
      country: {
        name: 'Paraguay',
        code: 'py',
      },
      company: 'Sport En Art',
      date: '2016-10-21',
      status: 'renewal',
      verified: false,
      activity: 100,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      balance: 4609,
    },
    {
      id: 1021,
      name: 'Veronika Inouye',
      country: {
        name: 'Ecuador',
        code: 'ec',
      },
      company: 'C 4 Network Inc',
      date: '2017-03-24',
      status: 'renewal',
      verified: false,
      activity: 72,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
      },
      balance: 26565,
    },
    {
      id: 1022,
      name: 'Willard Kolmetz',
      country: {
        name: 'Tunisia',
        code: 'tn',
      },
      company: 'Ingalls, Donald R Esq',
      date: '2017-04-15',
      status: 'renewal',
      verified: true,
      activity: 94,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 75876,
    },
    {
      id: 1023,
      name: 'Maryann Royster',
      country: {
        name: 'Belarus',
        code: 'by',
      },
      company: 'Franklin, Peter L Esq',
      date: '2017-03-11',
      status: 'qualified',
      verified: false,
      activity: 56,
      representative: {
        name: 'Elwin Sharvill',
        image: 'elwinsharvill.png',
      },
      balance: 41121,
    },
    {
      id: 1024,
      name: 'Alisha Slusarski',
      country: {
        name: 'Iceland',
        code: 'is',
      },
      company: 'Wtlz Power 107 Fm',
      date: '2018-03-27',
      status: 'qualified',
      verified: true,
      activity: 7,
      representative: {
        name: 'Stephen Shaw',
        image: 'stephenshaw.png',
      },
      balance: 91691,
    },
    {
      id: 1025,
      name: 'Allene Iturbide',
      country: {
        name: 'Italy',
        code: 'it',
      },
      company: 'Ledecky, David Esq',
      date: '2016-02-20',
      status: 'qualified',
      verified: true,
      activity: 1,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      balance: 40137,
    },
    {
      id: 1026,
      name: 'Chanel Caudy',
      country: {
        name: 'Argentina',
        code: 'ar',
      },
      company: 'Professional Image Inc',
      date: '2018-06-24',
      status: 'new',
      verified: true,
      activity: 26,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
      },
      balance: 21304,
    },
    {
      id: 1027,
      name: 'Ezekiel Chui',
      country: {
        name: 'Ireland',
        code: 'ie',
      },
      company: 'Sider, Donald C Esq',
      date: '2016-09-24',
      status: 'new',
      verified: false,
      activity: 76,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png',
      },
      balance: 60454,
    },
    {
      id: 1028,
      name: 'Willow Kusko',
      country: {
        name: 'Romania',
        code: 'ro',
      },
      company: 'U Pull It',
      date: '2020-04-11',
      status: 'qualified',
      verified: true,
      activity: 7,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      balance: 17565,
    },
    {
      id: 1029,
      name: 'Bernardo Figeroa',
      country: {
        name: 'Israel',
        code: 'il',
      },
      company: 'Clark, Richard Cpa',
      date: '2018-04-11',
      status: 'renewal',
      verified: true,
      activity: 81,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
      },
      balance: 17774,
    },
    {
      id: 1030,
      name: 'Ammie Corrio',
      country: {
        name: 'Hungary',
        code: 'hu',
      },
      company: 'Moskowitz, Barry S',
      date: '2016-06-11',
      status: 'negotiation',
      verified: true,
      activity: 56,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 49201,
    },
    {
      id: 1031,
      name: 'Francine Vocelka',
      country: {
        name: 'Honduras',
        code: 'hn',
      },
      company: 'Cascade Realty Advisors Inc',
      date: '2017-08-02',
      status: 'qualified',
      verified: true,
      activity: 94,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
      },
      balance: 67126,
    },
    {
      id: 1032,
      name: 'Ernie Stenseth',
      country: {
        name: 'Australia',
        code: 'au',
      },
      company: 'Knwz Newsradio',
      date: '2018-06-06',
      status: 'renewal',
      verified: true,
      activity: 68,
      representative: {
        name: 'Xuxue Feng',
        image: 'xuxuefeng.png',
      },
      balance: 76017,
    },
    {
      id: 1033,
      name: 'Albina Glick',
      country: {
        name: 'Ukraine',
        code: 'ua',
      },
      company: 'Giampetro, Anthony D',
      date: '2019-08-08',
      status: 'proposal',
      verified: true,
      activity: 85,
      representative: {
        name: 'Bernardo Dominic',
        image: 'bernardodominic.png',
      },
      balance: 91201,
    },
    {
      id: 1034,
      name: 'Alishia Sergi',
      country: {
        name: 'Qatar',
        code: 'qa',
      },
      company: 'Milford Enterprises Inc',
      date: '2018-05-19',
      status: 'negotiation',
      verified: false,
      activity: 46,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      balance: 12237,
    },
    {
      id: 1035,
      name: 'Solange Shinko',
      country: {
        name: 'Cameroon',
        code: 'cm',
      },
      company: 'Mosocco, Ronald A',
      date: '2015-02-12',
      status: 'qualified',
      verified: true,
      activity: 32,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      balance: 34072,
    },
    {
      id: 1036,
      name: 'Jose Stockham',
      country: {
        name: 'Italy',
        code: 'it',
      },
      company: 'Tri State Refueler Co',
      date: '2018-04-25',
      status: 'qualified',
      verified: true,
      activity: 77,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png',
      },
      balance: 94909,
    },
    {
      id: 1037,
      name: 'Rozella Ostrosky',
      country: {
        name: 'Venezuela',
        code: 've',
      },
      company: 'Parkway Company',
      date: '2016-02-27',
      status: 'unqualified',
      verified: true,
      activity: 66,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png',
      },
      balance: 57245,
    },
    {
      id: 1038,
      name: 'Valentine Gillian',
      country: {
        name: 'Paraguay',
        code: 'py',
      },
      company: 'Fbs Business Finance',
      date: '2019-09-17',
      status: 'qualified',
      verified: true,
      activity: 25,
      representative: {
        name: 'Bernardo Dominic',
        image: 'bernardodominic.png',
      },
      balance: 75502,
    },
    {
      id: 1039,
      name: 'Kati Rulapaugh',
      country: {
        name: 'Puerto Rico',
        code: 'pr',
      },
      company: 'Eder Assocs Consltng Engrs Pc',
      date: '2016-12-03',
      status: 'renewal',
      verified: false,
      activity: 51,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
      },
      balance: 82075,
    },
    {
      id: 1040,
      name: 'Youlanda Schemmer',
      country: {
        name: 'Bolivia',
        code: 'bo',
      },
      company: 'Tri M Tool Inc',
      date: '2017-12-15',
      status: 'negotiation',
      verified: true,
      activity: 49,
      representative: {
        name: 'Xuxue Feng',
        image: 'xuxuefeng.png',
      },
      balance: 19208,
    },
    {
      id: 1041,
      name: 'Dyan Oldroyd',
      country: {
        name: 'Argentina',
        code: 'ar',
      },
      company: 'International Eyelets Inc',
      date: '2017-02-02',
      status: 'qualified',
      verified: false,
      activity: 5,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png',
      },
      balance: 50194,
    },
    {
      id: 1042,
      name: 'Roxane Campain',
      country: {
        name: 'France',
        code: 'fr',
      },
      company: 'Rapid Trading Intl',
      date: '2018-12-25',
      status: 'unqualified',
      verified: false,
      activity: 100,
      representative: {
        name: 'Anna Fali',
        image: 'annafali.png',
      },
      balance: 77714,
    },
    {
      id: 1043,
      name: 'Lavera Perin',
      country: {
        name: 'Vietnam',
        code: 'vn',
      },
      company: 'Abc Enterprises Inc',
      date: '2018-04-10',
      status: 'qualified',
      verified: false,
      activity: 71,
      representative: {
        name: 'Stephen Shaw',
        image: 'stephenshaw.png',
      },
      balance: 35740,
    },
    {
      id: 1044,
      name: 'Erick Ferencz',
      country: {
        name: 'Belgium',
        code: 'be',
      },
      company: 'Cindy Turner Associates',
      date: '2018-05-06',
      status: 'unqualified',
      verified: true,
      activity: 54,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png',
      },
      balance: 30790,
    },
    {
      id: 1045,
      name: 'Fatima Saylors',
      country: {
        name: 'Canada',
        code: 'ca',
      },
      company: 'Stanton, James D Esq',
      date: '2019-07-10',
      status: 'renewal',
      verified: true,
      activity: 93,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      balance: 52343,
    },
    {
      id: 1046,
      name: 'Jina Briddick',
      country: {
        name: 'Mexico',
        code: 'mx',
      },
      company: 'Grace Pastries Inc',
      date: '2018-02-19',
      status: 'unqualified',
      verified: false,
      activity: 97,
      representative: {
        name: 'Xuxue Feng',
        image: 'xuxuefeng.png',
      },
      balance: 53966,
    },
    {
      id: 1047,
      name: 'Kanisha Waycott',
      country: {
        name: 'Ecuador',
        code: 'ec',
      },
      company: 'Schroer, Gene E Esq',
      date: '2019-11-27',
      status: 'new',
      verified: false,
      activity: 80,
      representative: {
        name: 'Xuxue Feng',
        image: 'xuxuefeng.png',
      },
      balance: 9920,
    },
    {
      id: 1048,
      name: 'Emerson Bowley',
      country: {
        name: 'Finland',
        code: 'fi',
      },
      company: 'Knights Inn',
      date: '2018-11-24',
      status: 'new',
      verified: false,
      activity: 63,
      representative: {
        name: 'Stephen Shaw',
        image: 'stephenshaw.png',
      },
      balance: 78069,
    },
    {
      id: 1049,
      name: 'Blair Malet',
      country: {
        name: 'Finland',
        code: 'fi',
      },
      company: 'Bollinger Mach Shp & Shipyard',
      date: '2018-04-19',
      status: 'new',
      verified: true,
      activity: 92,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 65005,
    },
  ],
};
const customerService = {
  getCustomersSmall() {
    return ddd.data;
  },

  getCustomersMedium() {
    return ddd.data;
  },

  getCustomersLarge() {
    return ddd.data;
  },

  getCustomersXLarge() {
    return ddd.data;
  },

  getCustomers(params) {
    const queryParams = Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
  },
};

const Companies = () => {
  const [customers, setCustomers] = useState(null);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'country.name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  });
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'country.name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  });
  const [filters3, setFilters3] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'country.name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  });
  const [selectedCustomer1, setSelectedCustomer1] = useState(null);
  const [selectedCustomer2, setSelectedCustomer2] = useState(null);
  const [selectedCustomer3, setSelectedCustomer3] = useState(null);
  const representatives = [
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' },
  ];
  const statuses = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'];

  const filtersMap = {
    filters1: { value: filters1, callback: setFilters1 },
    filters2: { value: filters2, callback: setFilters2 },
    filters3: { value: filters3, callback: setFilters3 },
  };

  useEffect(() => {
    // customerService.getCustomersMedium().then((data) => setCustomers(data));
    setCustomers(customerService.getCustomersMedium());
  }, []);

  const onCustomSaveState = (state) => {
    window.sessionStorage.setItem('dt-state-demo-custom', JSON.stringify(state));
  };

  const onCustomRestoreState = () => {
    return JSON.parse(window.sessionStorage.getItem('dt-state-demo-custom'));
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          alt={rowData.country.code}
          src="showcase/demo/images/flag_placeholder.png"
          onError={(e) => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
          className={`flag flag-${rowData.country.code}`}
          width="30"
        />
        <span className="image-text">{rowData.country.name}</span>
      </React.Fragment>
    );
  };

  const representativeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          alt={rowData.representative.name}
          src={`showcase/demo/images/avatar/${rowData.representative.image}`}
          onError={(e) => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
          width="32"
          style={{ verticalAlign: 'middle' }}
        />
        <span className="image-text">{rowData.representative.name}</span>
      </React.Fragment>
    );
  };

  const representativeFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={representatives}
        itemTemplate={representativesItemTemplate}
        onChange={(e) => options.filterCallback(e.value)}
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
      />
    );
  };

  const representativesItemTemplate = (option) => {
    return (
      <div className="p-multiselect-representative-option">
        <img
          alt={option.name}
          src={`showcase/demo/images/avatar/${option.image}`}
          onError={(e) => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
          width={32}
          style={{ verticalAlign: 'middle' }}
        />
        <span className="image-text">{option.name}</span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const onGlobalFilterChange = (event, filtersKey) => {
    const value = event.target.value;
    let filters = { ...filtersMap[filtersKey].value };
    filters.global.value = value;

    filtersMap[filtersKey].callback(filters);
  };

  const renderHeader = (filtersKey) => {
    const filters = filtersMap[`${filtersKey}`].value;

    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={filters.global.value || ''}
          onChange={(e) => onGlobalFilterChange(e, filtersKey)}
          placeholder="Global Search"
        />
      </span>
    );
  };

  const header1 = renderHeader('filters1');
  const header2 = renderHeader('filters2');
  const header3 = renderHeader('filters3');

  return (
    <div>
      <div className="card">
        <h5>Session Storage</h5>
        <DataTable
          value={customers}
          paginator
          rows={10}
          header={header1}
          filters={filters1}
          onFilter={(e) => setFilters1(e.filters)}
          selection={selectedCustomer1}
          onSelectionChange={(e) => setSelectedCustomer1(e.value)}
          selectionMode="single"
          dataKey="id"
          responsiveLayout="scroll"
          stateStorage="session"
          stateKey="dt-state-demo-session"
          emptyMessage="No customers found."
        >
          <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name"></Column>
          <Column
            header="Country"
            body={countryBodyTemplate}
            sortable
            sortField="country.name"
            filter
            filterField="country.name"
            filterPlaceholder="Search by country"
          ></Column>
          <Column
            header="Agent"
            body={representativeBodyTemplate}
            sortable
            sortField="representative.name"
            filter
            filterField="representative"
            showFilterMatchModes={false}
            filterElement={representativeFilterTemplate}
            filterMenuStyle={{ width: '14rem' }}
          ></Column>
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            filter
            filterElement={statusFilterTemplate}
            filterMenuStyle={{ width: '14rem' }}
          ></Column>
        </DataTable>
      </div>

      <div className="card">
        <h5>Local Storage</h5>
        <DataTable
          value={customers}
          paginator
          rows={10}
          header={header2}
          filters={filters2}
          onFilter={(e) => setFilters2(e.filters)}
          selection={selectedCustomer2}
          onSelectionChange={(e) => setSelectedCustomer2(e.value)}
          selectionMode="single"
          dataKey="id"
          responsiveLayout="scroll"
          stateStorage="local"
          stateKey="dt-state-demo-local"
          emptyMessage="No customers found."
        >
          <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name"></Column>
          <Column
            header="Country"
            body={countryBodyTemplate}
            sortable
            sortField="country.name"
            filter
            filterField="country.name"
            filterPlaceholder="Search by country"
          ></Column>
          <Column
            header="Agent"
            body={representativeBodyTemplate}
            sortable
            sortField="representative.name"
            filter
            filterField="representative"
            showFilterMatchModes={false}
            filterElement={representativeFilterTemplate}
            filterMenuStyle={{ width: '14rem' }}
          ></Column>
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            filter
            filterElement={statusFilterTemplate}
            filterMenuStyle={{ width: '14rem' }}
          ></Column>
        </DataTable>
      </div>

      <div className="card">
        <h5>Custom Storage</h5>
        <DataTable value={customers} paginator rows={10} header={header3} dataKey="id" responsiveLayout="scroll">
          <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name"></Column>
          <Column
            header="Country"
            body={countryBodyTemplate}
            sortable
            sortField="country.name"
            filter
            filterField="country.name"
            filterPlaceholder="Search by country"
          ></Column>
          <Column
            header="Agent"
            body={representativeBodyTemplate}
            sortable
            sortField="representative.name"
            filter
            filterField="representative"
            showFilterMatchModes={false}
            filterElement={representativeFilterTemplate}
            filterMenuStyle={{ width: '14rem' }}
          ></Column>
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            filter
            filterElement={statusFilterTemplate}
            filterMenuStyle={{ width: '14rem' }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Companies;
