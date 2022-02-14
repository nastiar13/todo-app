import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import app from '../firebase';
import {
  getDatabase,
  ref,
  remove,
  push,
  onValue,
  update,
} from 'firebase/database';

const db = getDatabase(app);

function Home() {
  const [todo, setTodo] = useState('');
  const [listTodo, setListTodo] = useState({});
  console.log(Object.entries(listTodo));
  useEffect(() => {
    const data = ref(db, 'todoList');
    onValue(data, (snapshot) => {
      setListTodo(snapshot.val());
    });
    return () => {
      console.log('a');
    };
  }, []);
  // add task
  function addTodo() {
    if (!todo) {
      alert('input cannot be empty');
      return false;
    }

    push(ref(db, '/todoList'), {
      activity: todo,
      isDone: false,
    }).then(() => {
      setTodo('');
    });
  }
  // update isDone to true
  function handleDone(key, val) {
    update(ref(db, 'todoList/' + key), {
      ...val,
      isDone: true,
    });
  }

  // delete
  function handleDelete(key) {
    remove(ref(db, 'todoList/' + key));
  }
  function renderItem({ item, index }) {
    return (
      <View style={styles.task}>
        <Text>
          {index + 1 + '. '} {item[1].activity}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item[1].isDone ? (
            <Text style={{ color: 'green' }}>✔</Text>
          ) : (
            <Text onPress={() => handleDone(item[0], item[1])}>Done</Text>
          )}
          <Text style={styles.delete} onPress={() => handleDelete(item[0])}>
            Delete
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.viewWrapper}>
      <View style={styles.listTodo}>
        <Text style={{ textAlign: 'center', fontSize: 30 }}>Task</Text>
        {listTodo && (
          <FlatList
            data={Object.entries(listTodo)}
            renderItem={renderItem}
            keyExtractor={(item) => item[0]}
          />
        )}
      </View>
      <View style={styles.add}>
        <TextInput
          style={styles.input}
          placeholder="Enter what you want to do"
          onChangeText={(text) => setTodo(text)}
          value={todo}
        />
        <Button title="Add" onPress={addTodo} />
      </View>
      <View style={styles.btnDelete}></View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  listTodo: {
    flex: 10,
    paddingVertical: 30,
  },
  add: {
    flex: 2,
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  btnDelete: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#afafaf',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: '#afafaf',
    borderRadius: 30,
  },
  delete: {
    marginLeft: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 5,
  },
});
