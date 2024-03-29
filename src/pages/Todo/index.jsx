import { useState } from 'react';
import OneTodo from './components/one-todo';
import TodoHead from './components/todo-head';
import styled from 'styled-components';
import { flexAlignCenter, positionCenter } from '../../styles/common.style';
import TodoModal from './components/todo-modal';
import plusIcon from '../../images/plus.png';
import { useQuery } from 'react-query';
import QueryKey from '../../consts/query-key';
import TodoApi from '../../apis/todo.api';

const Todo = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { data } = useQuery([QueryKey.todoData], () => TodoApi.getTodo());
    console.log('todoData', data?.data);

    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    return (
        <>
            {data && (
                <Wrapper>
                    <Container>
                        <TodoHead data={data} />
                        <TodoContainer>
                            {data.data.map((todo) => (
                                <OneTodo id={todo.idx} title={todo.title} content={todo.content} />
                            ))}
                        </TodoContainer>
                        <Button onClick={handleOpenModal}>
                            <img src={plusIcon} />
                        </Button>
                    </Container>
                </Wrapper>
            )}
            {isOpenModal && <TodoModal setIsOpenModal={setIsOpenModal} />}
        </>
    );
};

export default Todo;

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme.COLORS.gray[100]};
    overflow: hidden;
`;

const Container = styled.div`
    width: 30%;
    height: 80%;
    border-radius: 14px;
    background-color: white;
    flex-direction: column;
    ${positionCenter}
    ${flexAlignCenter}
	overflow: hidden;
`;

const TodoContainer = styled.div`
    margin-top: 140px;
    font-size: ${({ theme }) => theme.FONT_SIZE.medium};
    padding: 0% 6%;
    width: 100%;
`;

const Button = styled.div`
    background-color: ${({ theme }) => theme.COLORS.primary[500]};
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    position: absolute;
    bottom: 3%;
`;
