import TopHeader from '@/components/Top-Header.vue'
import { shallowMount} from '@vue/test-utils'
import flushPromises from 'flush-promises'

const $router = {
  replace: jest.fn()
}

// 3 mock firebase
jest.mock('firebase/app', () =>({
  // 1 mock auth
  auth(){
    return {
      onAuthStateChanged(fn){
        return fn(true)
      },
      // 4 mock singOut
      signOut: () => Promise.resolve()
    }
  },
  
}))

describe('topHeader.vue', () =>{
  let wrapper;
  beforeEach(() =>{
    wrapper = shallowMount(TopHeader, {
      mocks: {
        // 4 只能mock他自己本來就有的東西，所以才有$
        $router
      }
      /// methods: { setupFirebase: () => {}}
    })
  })
  
  // 1 create
  it('renders', () => {
    expect(wrapper.exists()).toBe(true)
  })

  // 2 logged in h1 div exist
  it('does h1 exist', ()=>{
    expect(wrapper.find('h1').text()).toBe('Logged in')
  })

  // 3 check mock success and data
  it('user logged in after setting firebase mock', () =>{
    expect(wrapper.vm.$data.loggedIn).toBe(true)
  })

  // 4 test signout
  it('on signout route to correct place', async () => {
    wrapper.find('button').trigger('click');
    await flushPromises();
    expect($router.replace).lastCalledWith({ name: "login" })
  })


})