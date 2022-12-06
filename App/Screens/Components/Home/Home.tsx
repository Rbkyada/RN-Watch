import React, {useEffect, useState} from 'react';
import {CustomText, Layout} from '@CommonComponent/index';
import {ButtonComponent} from '@SubComponents/index';
import BottomModalContainer from '@CommonComponent/BottommodalContainer';
import Fitness from '@ovalmoney/react-native-fitness';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

const Home = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [step, setStep] = useState<any>();
  const [sleepTime, setSleepTime] = useState<any>();
  const [heartRate, setHeartRate] = useState<any>();

  const permissions = [
    {
      kind: Fitness.PermissionKinds.Steps,
      access: Fitness.PermissionAccesses.Read,
    },
    {
      kind: Fitness.PermissionKinds.SleepAnalysis,
      access: Fitness.PermissionAccesses.Read,
    },
    {
      kind: Fitness.PermissionKinds.HeartRate,
      access: Fitness.PermissionAccesses.Read,
    },
  ];

  const timeZones = {
    startDate: moment().add(-1, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  };

  const watchConnectivityChange = async () => {
    const isAuth = await Fitness.requestPermissions(permissions);

    if (isAuth) {
      Fitness.getSteps(timeZones)
        .then(result => {
          setStep(result);
          console.log('Steps', result);
        })
        .catch(error => {
          console.log('Error', error);
        });

      Fitness.getSleepAnalysis(timeZones)
        .then(result => {
          setSleepTime(result);
          console.log('SleepTime', result);
        })
        .catch(error => {
          console.log('Error', error);
        });

      Fitness.getHeartRate(timeZones)
        .then(result => {
          setHeartRate(result);
          console.log('HeartRate', result);
        })
        .catch(error => {
          console.log('Error', error);
        });
    }
  };

  return (
    <Layout title="Widgets" padding={20}>
      <CustomText large>Home screen</CustomText>
      <ButtonComponent
        onPress={() => {
          watchConnectivityChange();
        }}
        title={'Get Analytics'}
      />
      <ScrollView style={{flex: 1}}>
        {step && (
          <>
            <CustomText large>Steps</CustomText>
            <CustomText large>{JSON.stringify(step)}</CustomText>
          </>
        )}
        {sleepTime && (
          <>
            <CustomText large>SleepTime</CustomText>
            <CustomText large>{JSON.stringify(sleepTime)}</CustomText>
          </>
        )}
        {heartRate && (
          <>
            <CustomText large>HeartRate</CustomText>
            <CustomText large>{JSON.stringify(heartRate)}</CustomText>
          </>
        )}
      </ScrollView>
      <BottomModalContainer
        title={'Modal'}
        onClose={() => watchConnectivityChange()}
        show={isShowModal}>
        <CustomText large>Modal</CustomText>
      </BottomModalContainer>
    </Layout>
  );
};

export default Home;
