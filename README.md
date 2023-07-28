# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

src
| -- components (shared components between features)
| ---|--Loading
| ------|-- index.jsx
| ------|-- styles.scss
| -- features
| ---|--Todo
| ------|-- components (componenst of feature Todo)
| ------|-- pages (pages of feature Todo)
| ------|-- index.jsx (entry point of feature Todo)
| -- App.js

<!-- Install  -->

- npm install sass : Sử dụng sass

  - nếu gặp lỗi: gỡ và cài lại ver 4 npm uninstall node-sass
    npm install node-sass@^4

- npm install query-string: sử dụng để chuyển object sang string
  - ex: const paramsString = queryString.stringify(filters);(ex:\_limit=10&\_page=1)
- npm install classnames: Một tiện ích JavaScript đơn giản để nối các tên lớp với nhau một cách có điều kiện.

  - ex: import classNames from "classnames";  
     className={classNames({
    // install npm npm i --save classnames // dùng cái này thì rất gọn
    "todo-item": true, // ví dụ có nhiều class thì rất tiền
    completedClassStyle: todo.status === "completed", //completedClassStyle là class sẽ đc add vào nếu điều kiện bên phải true
    })}

- install hook: npm install --save react-hook-form yup @hookform/resolvers @hookform/error-message
- Tạo ra file jsconfig.json // file này được tạo ra để giảm thiểu thời gian import, coppy // https://code.visualstudio.com/docs/languages/jsconfig
  ========================== HOOK =============================

  - khi update version check phiên bản trong github rồi dò lần lượt từng phiên bản từ phiên bản hiện tại đến phiên bản muốn update xem có breaking change không

  - Khi làm việc với object hoặc array thì phải clone ra cái mới, vì nó dạng tham chiếu nếu ko clone ra cái mới thì nó hiểu ko thay đổi gì cả
    ===================================================================================================================================================== useRef, Tạo ra 1 state và khi cập nhật nó ko re-render componenet chú ý: thằng này trigger function ở thằng con khi ở thằng cha useEffect: chạy sau phần render return   
   useSelector useQuery, useMemo, check kiểm tra nó có thay đổi hay ko mới re-render useState: re-render component: chủ yếu là state: 1. state chính nó, 2.     
   props, 3. state ở store và state đó change hàm setState là asyn func, dù cón log ra thì nó vẫn là giá trị cũ - trường hợp update state 2 lần trong 1 func thì 
   cần code khác - updating state based on the prev state const a =1 ex: const updateFunction = () => { setAge(a + 1); setAge(a + 1); } => ở đây vẫn trả về là 2, 
   ko phải 3 như mong đợi

=> có thể xài cách này để solve this problem : setAge(a => a +1) : truyền vào 1 function callback
Lưu ý khi update 1 obj, array thì cần clone ra 1 obj mới, tạo ra tham chiếu mới rồi gọi hàm setState thì mới trigger re-render

    Đối với xử lý tham chiếu nên xài useImmer (ImmerJS)

Những biến bình thường sẽ không persict, sẽ reset khi re-render (ex: let a =1)

**StrictMode** chạy 2 lần, nhưng chỉ ở dưới dev, để nó check có phải pure function hay không, nếu là impure thì cần fix

**Bundling:** Nếu sử dung CRA để tạo app thì nó sử dụng thằng webpack để làm quá trình bundle, khi deploy thì nó sẽ gom hết code react để tạo ra file dist(distribution) và trong đó sẽ chỉ có 1 file js đã được bundle. Nếu có quá nhiều component phức tạp nên sử dụng kỹ thuật Code spliting( React Lazy - Chỉ hiểu quả đối với môi trường production)

xử lý dữ liệu: 0.1 + 0.2 = 0.300000000004 phải cần sử dụng BigInt 1+ 2 + '3' = '33' || '42' - 2 = 40. vì quy tắc chuyển đổi kiểu dữ liệu tự động trong JavaScript, được gọi là nguyên tắc "implicit type coercion".

**Tham trị và tham chiếu trong JS**: 
  Cách thức 1 biến trong js đc lưu ntn: lưu dạng tham trị hay tham chiếu
    **Tham trị**: lưu dạng giá trị vd:( number, string, boolean, null, underfined) lưu trực tiếp giá trị xuống vùng nhớ
    **Tham chiếu**: lưu dạng tham chiếu vd(objact, array) lưu địa chỉ nơi giữa giá trị vd: const a= {name: TMT} thực chất a = 1E2F 1E2F là địa chỉ của kho chứa,     chứa giá trị obj
      ! nhớ clone ra obj mới khi thay đổi props state reactJS/ Redux
      
**Khác nhau giữa get và post, có thể xài post để get data đc ko,**
    Khi bạn sử dụng POST để lấy dữ liệu, bạn cần phải viết mã xử lý trên máy chủ để xử lý yêu cầu POST và trả về dữ liệu yêu cầu.
    Sử dụng phương thức POST để lấy dữ liệu có thể gây rối cho các nhà phát triển khác, vì họ thường kỳ vọng rằng POST sẽ gửi dữ liệu lên máy chủ và không trả về         dữ liệu từ máy chủ.
    Nhìn chung, để lấy dữ liệu từ máy chủ, bạn nên sử dụng phương thức GET. Để gửi dữ liệu lên máy chủ, hãy sử dụng phương thức POST.

**Có thể edit state của redux trực tiếp được không?** 
    Không, State redux là ReadOnly chỉ có sử dụng dispatch để update
    
**lỗi thường gặp cảu redux, nguyên lý của redux** 
  - Xem trong file pdf
  - 
**Life Cycle** trong React hoạt động như thế nào ? Hãy chỉ ra flow của một life cycle?
    **componentWillMount** đây là method sẽ được thực thi trước khi 1 component được render trên cả server side và client side.    
    **componentDidMount** method này được thực thi khi 1 component được render trên client side. Đây là nơi các hàm AJAX requests, DOM or update state được thực        thi. Method này cũng đucợ sử dụng để kết nối với các JS Framework khác và các function với delayed execution như setTimeout or setInterval.    
    **componentWillReceiveProps** sẽ được thực thi ngay khi thuộc tính props (tìm hiểu props là gì?) được update và trước khi component được render lại. Trong ví       dụ dưới, ta sẽ sử dung method này vùng với setNewNumber để update state.   
    **shouldComponentUpdate** sẽ trả về kết quả true or false. Phương thức này sẽ xác định 1 component có được update hay không. Mặc định giá trị này là true.       Nếu bạn không muốn component render lại sau khi update state hay props thì return giá trị thành false. Các bạn xem ví dụ dưới để hiểu rõ.  
    **componentWillUpdate** được gọi khi chúng ta update state của component trước khi nó render lại.    
    **componentDidUpdate** sau khi componentWillUpdate ở trên được gọi xong thì đến lượt thằng này được goi.    
    **componentWillUnmount** được gọi khi chúng ta unmout 1 component kiểu như xóa nó khỏi react.
    
**JavaScript closures là gì?**
  JavaScript Closures là tập hợp bao gồm một hàm và môi trường nơi hàm số đó được khai 	báo. Ở đây, môi trường bao gồm tất cả những biến cục bộ trong phạm vi hàm   số được khai báo. (Để đơn giản, từ nay mình sẽ sử dụng hàm closures khi nói về JavaScript closures).
	Hàm closures có thể truy cập biến số ở 3 phạm vi khác nhau là:
		Biến toàn cục (global)
		Biến được khai báo ở hàm số chứa hàm closures (outer function)
		Biến ở trên trong hàm closures

**Var, Let, Const trong JS**
  Khai báo var được định phạm vi toàn cục (global) hay hàm (function) trong khi let và const được định phạm vi là khối mã (block)
  Biến var có thể được cập nhật và khai báo lại trong phạm vi tồn tại; biến let có thể được cập nhật nhưng không thể khai báo lại; biến const không thể cập nhật       nhưng không thể khai báo lại.
  Khai báo của var, let, const đều được dịch chuyển lên đầu của phạm vi. Nhưng trong khi biến var được khởi gán giá trị với undefined, biến let và const không       được khởi gán giá trị.
  Trong khi var và let có thể được khai báo không khởi gán giá trị, const phải khởi gán giá trị khi khai báo.
  
**Cơ chế đồng bộ, bất đồng bộ trong JS**
  Đồng bộ (sync) - bất đồng bộ (async) - EVENT LOOP trong JavaScript: coi ytb: https://www.youtube.com/watch?v=jfQUw8QxaZc&ab_channel=Firelop

  
