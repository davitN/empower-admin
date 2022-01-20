import { ElementType } from 'react';
import Companies from '../routes/Companies';
import CompanyDetails from '../routes/CompanyDetails';
import AppUsers from '../routes/AppUsers';
import UserDetails from '../routes/UserDetails';
import LocationDetails from '../routes/LocationDetails';
import AppContent from '../routes/AppContent';
import AppContentDetail from '../routes/AppContentDetail';
import AppAdmins from '../routes/AppAdmins';
import AppAdminDetails from '../routes/AppAdminDetails';
import AppUserAccount from '../routes/AppUserAccount';
import Analytics from '../routes/Analytics';
import Reports from '../routes/Reports';
import EthosCards from '../routes/EthosCards';
import EthosCardsDetails from '../routes/EthosCardsDetails';
import GeneralContentLibrary from '../routes/GeneralContentLibrary';
import GeneralContentLibraryDetails from '../routes/GeneralContentLibraryDetails';
import UserLastMonthProgress from '../routes/UserLastMonthProgress';

export interface RouteType {
  type: 'nested' | 'default',
  name: string,
  path: string,
  Component?: ElementType,
  disabled?: boolean,
  hiddenInNav?: boolean,
  pathName: string,
  nestedRoutes?: {
    index?: boolean,
    Component: Function,
    path?: string,
    disabled?: boolean
  }[]
}

export const routes: RouteType[] = [
  {
    type: 'default',
    name: 'Analytics',
    path: 'analytics',
    Component: Analytics,
    pathName: 'analytics',
  },
  {
    type: 'nested',
    name: 'Companies',
    path: 'companies',
    pathName: 'companies',
    nestedRoutes: [
      {
        index: true,
        Component: Companies,
      },
      {
        path: ':companyId',
        Component: CompanyDetails,
      },
    ],
  },
  {
    type: 'nested',
    name: 'App Users',
    path: 'app-users',
    pathName: 'appUsers',
    nestedRoutes: [
      {
        index: true,
        Component: AppUsers,
      },
      {
        path: ':userId',
        Component: UserDetails,
      },
      {
        path: 'user-progress/:userId',
        Component: UserLastMonthProgress,
      },
    ],
  },
  {
    type: 'nested',
    name: 'App Content',
    path: 'app-content',
    pathName: 'appContent',
    nestedRoutes: [
      {
        index: true,
        Component: AppContent,
      },
      {
        path: ':itemName/:mode/:id',
        Component: AppContentDetail,
      },
    ],
  },
  {
    type: 'nested',
    name: 'App Admins',
    path: 'app-admins',
    pathName: 'appAdmins',
    nestedRoutes: [
      {
        index: true,
        Component: AppAdmins,
      },
      {
        path: ':type/:id',
        Component: AppAdminDetails,
      },
    ],
  },
  {
    type: 'nested',
    name: 'Ethos Cards',
    path: 'ethos-cards',
    pathName: 'ethosCards',
    nestedRoutes: [
      {
        index: true,
        Component: EthosCards,
      },
      {
        path: ':mode',
        Component: EthosCardsDetails,
      },
      {
        path: ':mode/:id',
        Component: EthosCardsDetails,
      },
    ],
  },
  {
    type: 'nested',
    name: 'General Content Library',
    path: 'general-content-library',
    pathName: 'generalContentLibrary',
    nestedRoutes: [
      {
        index: true,
        Component: GeneralContentLibrary,
      },
      {
        path: ':mode',
        Component: GeneralContentLibraryDetails,
      },
      {
        path: ':mode/:id',
        Component: GeneralContentLibraryDetails,
      },
    ],
  },
  {
    type: 'default',
    name: 'Account',
    path: 'user-profile',
    pathName: 'userProfile',
    Component: AppUserAccount,
  },

  {
    type: 'default',
    name: 'Reports',
    path: 'reports',
    pathName: 'reports',
    Component: Reports,
    disabled: true,
  },
  {
    type: 'default',
    name: 'Locations',
    path: 'locations/:id',
    pathName: 'locations',
    Component: LocationDetails,
    hiddenInNav: true,
  },
];
