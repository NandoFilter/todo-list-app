import { Task } from '@/@types/Task';
import { Trash } from '@/assets/svg';
import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#262626',

    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#333',

    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 8,
    padding: 12
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  taskCheckbox: {
    borderRadius: 100,
    borderColor: '#1E6F9F'
  },
  taskLabel: {
    width: '85%',
    color: '#D9D9D9'
  },
  taskLabelChecked: {
    width: '85%',
    color: '#808080',
    textDecorationLine: 'line-through'
  }
});

type Props = {
  task: Task;
  handleSetIsChecked: (task: Task) => void;
  handleDelete: (task: Task) => void;
};

export function TaskItem({ task, handleSetIsChecked, handleDelete }: Props) {
  return (
    <View style={styles.task}>
      <View style={styles.taskInfo}>
        <Checkbox
          style={styles.taskCheckbox}
          value={task.isChecked}
          onValueChange={() => handleSetIsChecked(task)}
          color={task.isChecked ? '#8284FA' : undefined}
        />
        <Text
          style={task.isChecked ? styles.taskLabelChecked : styles.taskLabel}
        >
          {task.title}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(task)}>
        <Trash />
      </TouchableOpacity>
    </View>
  );
}
