import { useState, useEffect } from 'react';
import axios from 'axios';
import Task from '@/model/Task';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks/all');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const fetchActiveTasks = async () => {
    try {
      const response = await axios.get('/api/tasks/active');
      setActiveTasks(response.data);
    } catch (error) {
      console.error('Error fetching active tasks', error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get('/api/tasks/completed');
      setCompletedTasks(response.data);
    } catch (error) {
      console.error('Error fetching completed tasks', error);
    }
  };

  const handleCompleteTask = async (taskTitle: string) => {
    try {
      await axios.post('/api/tasks/complete', { taskTitle });
      fetchTasks();
      fetchActiveTasks();
      fetchCompletedTasks();
    } catch (error) {
      console.error('Error completing task', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchActiveTasks();
    fetchCompletedTasks();
  }, []);

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Task Manager App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Task Manager</h1>
        <div className={styles.taskContainers}>
          <section className={styles.taskSection}>
            <h2>All Tasks</h2>
            <ul className={styles.taskList}>
              {tasks.map(task => (
                <li key={task.id} className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
                  {task.title} - {task.completed ? 'Completed' : 'Active'}
                  {!task.completed && (
                    <button onClick={() => handleCompleteTask(task.title)}>Complete</button>
                  )}
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.taskSection}>
            <h2>Active Tasks</h2>
            <ul className={styles.taskList}>
              {activeTasks.map(task => (
                <li key={task.id} className={styles.taskItem}>{task.title}</li>
              ))}
            </ul>
          </section>
          <section className={styles.taskSection}>
            <h2>Completed Tasks</h2>
            <ul className={styles.taskList}>
              {completedTasks.map(task => (
                <li key={task.id} className={`${styles.taskItem} ${styles.completed}`}>{task.title}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default TaskManager;
