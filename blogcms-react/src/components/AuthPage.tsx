import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
  } from '@mantine/core';
import { useForm } from '@mantine/form';
import { UserCredentials } from '@supabase/supabase-js';
import { sbClient } from '../services/sb';
/**
 * Interfaces and types
 */
interface LoginValues {
    email: string
    password: string
}
  
  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: 900,
      backgroundSize: 'cover',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },
  
    form: {
      borderRight: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
      minHeight: 900,
      maxWidth: 450,
      paddingTop: 80,
  
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: '100%',
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    logo: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      width: 120,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));
  
  export function AuthPage() {
    const { classes } = useStyles();
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          },
    })

  async function handleSubmit (values: LoginValues) {
    console.log(values.email, values.password)
    sbClient.auth.signIn(values as UserCredentials)
  } 
    return (
      <div className={classes.wrapper}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
            Welcome to BlogCMS
          </Title>
  
          <TextInput label="Email address" placeholder="hello@gmail.com" size="md"
          required
          {...form.getInputProps('email')} />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"
          required
          {...form.getInputProps('password')} />
          <Button type="submit" fullWidth mt="xl" size="md">
            Login
          </Button>
  
          <Text align="center" mt="md">
            Contact your administrator to request credentials.
            
          </Text>
        </Paper>
        </form>
      </div>
    );
  }
  