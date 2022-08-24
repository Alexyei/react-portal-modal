Обычно модальное окно должно находиться поверх всех остальных элементов на странице. Но служная структура элементов может создать баги.
Например если родительский элемент, модального окна имеет zIndex меньше, чем сосед, то сосед будет поверх модального окна.
Так ``` <div style={BUTTON_WRAPPER_STYLES}>```  имеет ``` zIndex = 1``` , а
 ``` <div style={OTHER_CONTENT_STYLES}>```  имеет ``` zIndex = 2``` , поэтому OTHER_CONTENT
отрисовывается поверх модального окна, имеющий стиль ``` zIndex = 1000```

Поэтому, чтобы избежать визульных побочных эффектов, следует разместить модальное окно на самом верхнем уровне элементов на равне с root.
Для этого в index.html можно создать специальный элемент: <div id="portal"></div>
А дальше нужно обернуть возвращаемое значение компонента модального окна в портал:
``` typescript jsx
const Modal: FC<{ children: ReactNode, open: boolean, onClose: () => void }> = ({children, open, onClose}) => {
    if (!open) return null;

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLE}/>
            <div style={MODAL_STYLES}>
                <button onClick={onClose}>Close Modal</button>
                {children}
            </div>
        </>
        , document.getElementById('portal')!)
}
```
Обратите внимание, что не смотрят на то что модальное окно находится в соседнем с root элементе, его логически-родительский элемент (BUTTON_WRAPPER), получает всплытие событий от модального окна, как буд-то он фактически находится в нём. React выполняет переадресацию событий. и мы получаем clicked в консоли когда нажимаем в любом месте модального окна или его оверлея.


Так не работает кнопка close, нет переадресации событий, ошибка в консоли:
```
const Modal: any = ({children, open, onClose}:any) => {
    if (!open) return null;

    ReactDOM.render(
        <>
            <div style={OVERLAY_STYLE}/>
            <div style={MODAL_STYLES}>
                <button onClick={onClose}>Close Modal</button>
                {children}
            </div>
        </>
        , document.getElementById('portal')!)

}
```
