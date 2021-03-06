import Vue from 'vue'

describe('Instance methods events', () => {
  let vm, spy
  beforeEach(() => {
    vm = new Vue()
    spy = jasmine.createSpy('emitter')
  })

  it('$on', () => {
    vm.$on('test', function () {
      // expect correct context
      expect(this).toBe(vm)
      spy.apply(this, arguments)
    })
    vm.$emit('test', 1, 2, 3, 4)
    expect(spy.calls.count()).toBe(1)
    expect(spy).toHaveBeenCalledWith(1, 2, 3, 4)
  })

  it('$once', () => {
    vm.$once('test', spy)
    vm.$emit('test', 1, 2, 3)
    vm.$emit('test', 2, 3, 4)
    expect(spy.calls.count()).toBe(1)
    expect(spy).toHaveBeenCalledWith(1, 2, 3)
  })

  it('$off', () => {
    vm.$on('test1', spy)
    vm.$on('test2', spy)
    vm.$off()
    vm.$emit('test1')
    vm.$emit('test2')
    expect(spy).not.toHaveBeenCalled()
  })

  it('$off event', () => {
    vm.$on('test1', spy)
    vm.$on('test2', spy)
    vm.$off('test1')
    vm.$off('test1') // test off something that's already off
    vm.$emit('test1', 1)
    vm.$emit('test2', 2)
    expect(spy.calls.count()).toBe(1)
    expect(spy).toHaveBeenCalledWith(2)
  })

  it('$off event + fn', () => {
    var spy2 = jasmine.createSpy('emitter')
    vm.$on('test', spy)
    vm.$on('test', spy2)
    vm.$off('test', spy)
    vm.$emit('test', 1, 2, 3)
    expect(spy).not.toHaveBeenCalled()
    expect(spy2.calls.count()).toBe(1)
    expect(spy2).toHaveBeenCalledWith(1, 2, 3)
  })
})
