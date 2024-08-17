import { Task } from '@/@types/Task';
import { EmptyList, Logo, Plus } from '@/assets/svg';
import { TaskItem } from '@/components/TaskItem';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

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

    marginLeft: 20,
    marginRight: 20,
    padding: 45,
    gap: 15
  },
  emptyListLabel: {
    color: '#808080'
  }
});

export function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');

  const [createdCount, setCreatedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const stats = [
    { id: 0, label: 'Criadas', color: '#4EA8DE', count: createdCount },
    {
      id: 1,
      label: 'Concluídas',
      color: '#8284FA',
      count: completedCount
    }
  ];

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const handleCreateTask = () => {
    let task: Task = {
      title: taskName.trim(),
      isChecked: false
    };

    if (!task) {
      return Alert.alert('Valor inválido', 'Preencha o campo corretamente');
    }

    if (tasks.includes(task)) {
      return Alert.alert(
        'Tarefa existente',
        'Essa tarefa já foi criada anteriormente'
      );
    }

    setTasks((prevState) => [...prevState, task]);
    setTaskName('');
    setCreatedCount(createdCount + 1);
  };

  const handleDeleteTask = (task: Task) => {
    Alert.alert('Remover', `Remover a tarefa "${task.title}"?`, [
      {
        text: 'Sim',
        onPress: () => {
          setTasks((prevState) =>
            prevState.filter((t) => t.title !== task.title)
          );

          if (task.isChecked) {
            setCompletedCount(completedCount - 1);
          }

          setCreatedCount(createdCount - 1);
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  };

  const handleSetIsChecked = (taskToUpdate: Task) => {
    const newValue = !taskToUpdate.isChecked;

    setTasks((prevState) =>
      prevState.map((task) =>
        task.title === taskToUpdate.title
          ? { ...task, isChecked: newValue }
          : task
      )
    );

    setCompletedCount(newValue ? completedCount + 1 : completedCount - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />

        <View style={styles.form}>
          <TextInput
            style={[
              styles.input,
              { borderColor: isFocused ? '#8284FA' : '#0D0D0D' }
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor={'#808080'}
            onChangeText={setTaskName}
            value={taskName}
          />
          <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
            <Plus />
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
          data={tasks}
          keyExtractor={(item: Task) => item.title}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              handleSetIsChecked={handleSetIsChecked}
              handleDelete={handleDeleteTask}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <EmptyList />
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
