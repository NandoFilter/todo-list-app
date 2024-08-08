import { useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
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
  },
  content: {
    flex: 1,
    marginTop: 60
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingLeft: 20,
    paddingRight: 20
  },
  statsBlock: {
    flexDirection: 'row',
    gap: 8
  },
  statsLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  statsCount: {
    color: '#D9D9D9',
    backgroundColor: '#333',
    borderRadius: 10,

    paddingLeft: 10,
    paddingRight: 10,

    alignSelf: 'center'
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',

    borderTopColor: '#333',
    borderTopWidth: 1,

    margin: 20,
    padding: 45,
    gap: 15
  },
  emptyListLabel: {
    color: '#808080'
  }
});

export function Home() {
  const [items, setItems] = useState([]);

  const stats = [
    { id: 0, label: 'Criadas', color: '#4EA8DE', count: 0 },
    { id: 1, label: 'Concluídas', color: '#8284FA', count: 0 }
  ];

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

      <View style={styles.content}>
        <View style={styles.stats}>
          {stats.map((s) => {
            return (
              <View style={styles.statsBlock} key={s.id}>
                <Text style={[styles.statsLabel, { color: s.color }]}>
                  {s.label}
                </Text>
                <Text style={styles.statsCount}>{s.count}</Text>
              </View>
            );
          })}
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text>{item}</Text>}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Image source={require('../../assets/empty_list.png')} />
              <View>
                <Text style={[styles.emptyListLabel, { fontWeight: 'bold' }]}>
                  Você ainda não tem tarefas cadastradas
                </Text>
                <Text style={styles.emptyListLabel}>
                  Crie tarefas e organize seus itens a fazer
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
