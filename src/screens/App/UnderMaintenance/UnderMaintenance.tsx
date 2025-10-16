import React, { FC } from 'react';
import UnderMaintenanceIcon from '../../../assets/images/icons/under-maintenance.svg';
import * as S from './UnderMaintenance.style';


const UnderMaintenance: FC = () => {
  return (
    <S.Container>
      <UnderMaintenanceIcon />
      <S.Title testID="maintenance-title">
        Under Maintenance
      </S.Title>
      <S.Description testID="maintenance-text">
        We&apos;re working on it. Please check back soon! Thank you for your patience!
      </S.Description>
    </S.Container>
  );
};

export default UnderMaintenance;
