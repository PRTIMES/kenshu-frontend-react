import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import Input from '@mui/joy/Input';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { useCallback, useState } from 'react';
import Typography from '@mui/joy/Typography';
import { Task, getListTasksQueryKey, useCreateTask, useListTasks } from './generated';
import { useQueryClient } from 'react-query';

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

export const App = () => {
  const [title, setTitle] = useState('');
   
  const onChangeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value), [title]);
  const { data, status, error } = useListTasks();

  const client = useQueryClient();
  const result = useCreateTask({
    mutation: {
      onSuccess: (result) => {
        //useCreateTaskの中でpostが完了してからmutationが行われるので同期関数であるsetQueryData使える
        client.setQueryData(getListTasksQueryKey(), (prevState: any) => {
          console.log(result)
          const prevTaskList = prevState.data.tasks;
          const nextState = {
            ...prevState,
            data: { tasks: [...prevTaskList, result.data.task] },
          };

          return nextState;
        });
      },
    },
  });
  //引数がなんで連想配列{}？→client.ts121行目をみると{mutation: ~, axios: ~}となっているので連想配列で渡してあげる。
  //onSuccessはpromiseオブジェクトにチェインするメソッド。だから、引数にmutationFnに指定したメソッド(APIリクエスト)の結果が使える。
  //setQueryDataはonSuccessなら使うよね。setQueryDataはリクエストは飛ばさず、キャッシュの部分的更新。。getリクエスト投げるのはfetchで、キャッシュを丸ごと更新
  //mutate(x)の引数には、useMutation(mutationFn: (x) => {})のxに渡すことができる。
  //今回はpostしない仕様だから。
  //mutate()はuseMutateで定義したリソースに関する変更の処理を実行するもの。

  const onClickCreateButton = () => {
    result.mutate();
    setTitle('');
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
            endDecorator={<Button onClick={onClickCreateButton} disabled={title.length > 0 ? false : true} >作成</Button>}
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
            status === 'error' && <Typography sx={{ textAlign: 'center'}} color='danger'>エラーです。</Typography>
          }
        </Box>
      </Container>
    </main>
  );
};
