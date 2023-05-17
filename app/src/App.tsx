import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import Input from '@mui/joy/Input';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { useCallback, useState } from 'react';
import Typography from '@mui/joy/Typography';
import { Task, useListTasks } from './generated';

export const App = () => {
  const [title, setTitle] = useState('');
   
  const onChangeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value), [title]);
  const { data, status, error } = useListTasks();

  const MainStyle = {
    display: 'grid',
     alignItems: 'center', 
     width: '100%', 
     minWidth: '700px', 
     height: 'auto', 
     minHeight: '700px'
  }

  const ContainerStyle = {
    display: 'grid',
    gridTemplateRows: '0.6fr 1.4fr',
    rowGap: '100px',
  }

  const inputStyle = {
    display: 'grid', 
    justifyContent: 'center'
  }

  const BoxTasksStyle = {
    display: 'grid',
    rowGap: '3px',
  }

  // const BoxTaskStyle = {
  //   display: 'grid',
  //   gridTemplateColumns: '0.3fr 2.4fr 0.3fr'
  // }
  return (
    <main style={MainStyle}>
      <Container style={ContainerStyle}>
        <Box>
          <Input
            onChange={onChangeTitle}
            value={title}
            startDecorator={<FormatListBulletedRoundedIcon />}
            endDecorator={<Button>作成</Button>}
          />
        </Box>
        <Box style={BoxTasksStyle}>
          {
            status === 'loading' && <Typography color='primary' sx={{ textAlign: 'center'}}>ロード中...</Typography>
          }
          {
            status === 'success' && data.data.tasks.map((data: Task) => 
            <Box key={data.id}>
              {/* <CheckCircleOutlineRoundedIcon color='green' /> */}
              <Input value={data['title']} readOnly={true} style={inputStyle}/>
            </Box>
          )}
          {
            status === 'error' && <Typography sx={{ textAlign: 'center'}} textColor='red'>エラーです。</Typography>
          }
        </Box>
      </Container>
    </main>
  );
};
