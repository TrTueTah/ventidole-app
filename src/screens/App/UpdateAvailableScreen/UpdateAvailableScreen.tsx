import React, { FC } from 'react';
import { Linking } from 'react-native';
import UpdateAvailableIcon from '../../../assets/images/app/update-available.png';
import DownloadIcon from '../../../assets/images/icons/download.svg';
import * as S from './UpdateAvailableScreen.style';
import useStoreData from './hooks/useStoreData';

interface UpdateAvailableProps {
}

const UpdateAvailable: FC<UpdateAvailableProps> = () => {
    const { appstoreUrl } = useStoreData();

    return (
        <S.Container>
            <S.UpdateAvailableImage source={UpdateAvailableIcon} />
            <S.UpdateAvailableTitle>Update Available</S.UpdateAvailableTitle>
            <S.UpdateAvailableDescription>
                {`Update Version to for enhanced performance and new features!`}
            </S.UpdateAvailableDescription>
            <S.ButtonContainer>
                <S.Button onPress={() => Linking.openURL(appstoreUrl)}>
                    <DownloadIcon />
                    <S.ButtonText>Update</S.ButtonText>
                </S.Button>
            </S.ButtonContainer>
        </S.Container>
    );
};

export default UpdateAvailable;
