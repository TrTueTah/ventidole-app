import React, { useCallback, useState } from 'react';
import { Modal, ScrollView, ActivityIndicator } from 'react-native';
import * as S from './TermsModal.style';
import { useEulaData } from '../../TermAndUse/hooks/useEulaData';
import Button from 'components/Button/Button';
import { blackColor } from 'constants/colors';

interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ visible, onClose, onAccept }) => {
  const { dataEula, loading } = useEulaData();
  const [endReached, setEndReached] = useState(false);

  const handleScroll = useCallback((event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    const isEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    
    if (isEnd && !endReached) {
      setEndReached(true);
    }
  }, [endReached]);

  const handleAccept = () => {
    if (endReached) {
      onAccept();
    }
  };

  const renderItem = useCallback(
    (item: { id: number; title: string; description: string }) => (
      <S.ItemContainer key={item.id} isLast={item.id === dataEula.length - 1}>
        {item.title && <S.ItemTitle>{item.title}</S.ItemTitle>}
        <S.ItemDescription>{item.description}</S.ItemDescription>
      </S.ItemContainer>
    ),
    [dataEula.length],
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <S.Container>
        <S.Header>
          <S.HeaderTitle>End-User License Agreement (EULA)</S.HeaderTitle>
        </S.Header>
        
        {loading ? (
          <S.LoaderContainer>
            <ActivityIndicator color={blackColor} size="large" />
          </S.LoaderContainer>
        ) : (
          <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={400}
            showsVerticalScrollIndicator={true}
          >
            {dataEula.map(renderItem)}
          </ScrollView>
        )}
        
        <S.ButtonRow>
          <Button
            title="Deny"
            variant="gray"
            buttonStyle={{ flex: 1 }}
            onPress={onClose}
          />
          <Button
            title="Accept"
            variant="default"
            disabled={!endReached}
            buttonStyle={{ flex: 1 }}
            onPress={handleAccept}
          />
        </S.ButtonRow>
      </S.Container>
    </Modal>
  );
};
