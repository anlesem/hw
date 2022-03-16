import { render, screen, fireEvent } from '@testing-library/react';
import { MessageForm } from './MessageForm';

import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('MessageForm', () => {
  it('Компонент существует', () => {
    expect(MessageForm).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const chatId = '1';
    const formData = { chatId: chatId };
    const { asFragment } = render(
      <Provider store={store}>
        <MessageForm formData={{ formData }} />
      </Provider>
    );
    expect(asFragment(<MessageForm />)).toMatchSnapshot();
  });

  it('Начало: Основное поле ввода пустое', () => {
    const chatId = '1';
    const formData = { chatId: chatId };
    render(
      <Provider store={store}>
        <MessageForm formData={{ formData }} />
      </Provider>
    );

    const input = screen.getByTestId('message-form-input');
    expect(input.value).toBe('');
  });

  it('Заполнение поле ввода', () => {
    const chatId = '1';
    const formData = { chatId: chatId };
    render(
      <Provider store={store}>
        <MessageForm formData={{ formData }} />
      </Provider>
    );

    const input = screen.getByTestId('message-form-input');

    fireEvent.change(input, { target: { value: 'bla-bla-bla' } });
    expect(input.value).toBe('bla-bla-bla');
  });

  it('Обработка клика на кнопку', () => {
    const chatId = '1';
    const formData = { chatId: chatId };
    const sendMassage = jest.fn();

    render(
      <Provider store={store}>
        <MessageForm formData={{ chatId, sendMassage, formData }} />
      </Provider>
    );

    const input = screen.getByTestId('message-form-input');
    const button = screen.getByTestId('message-form-button');

    fireEvent.change(input, { target: { value: 'bla-bla-bla' } });
    expect(input.value).toBe('bla-bla-bla');

    fireEvent.click(button);
    expect(sendMassage).toBeCalled();
    expect(input.value).toBe('');
  });
});
