#!/bin/sh

if [ "$BUILD_ENV" = "prod"  ];
then sed -Ei "s/(export const backendUrl =).*/\1 'https\:\/\/api.empowerofyou.com\/admin\/';/g"  src/services/credentials.service.ts
fi
