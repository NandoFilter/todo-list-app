import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    position: 'relative'
  },
  header: {
    backgroundColor: '#0D0D0D',
    height: 175,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    flexDirection: 'row',

    paddingLeft: 20,
    paddingRight: 20,

    position: 'absolute',
    bottom: -25
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#262626',

    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#0D0D0D',

    color: '#F2F2F2',
    fontSize: 16,

    marginRight: 12,
    padding: 16
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E6F9F'
  }
});

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor={'#808080'}
          />
          <TouchableOpacity style={styles.button}>
            <Image source={require('../../assets/plus.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
