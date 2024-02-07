/** 编写类型声明使得可以通过类型检查 */

declare function SimpleVue<T>(options: {
  data: () => T,
  methods: { [method: string]: (this: T) => any },
  computed: { [name: string]: (this: T) => any },
}): any;


SimpleVue({
  data () {
    return {
      name: 'feng',
      age:11,
    }
  },
  methods: {
    getName: function() {
      return this.name;
    }
  },
  computed: {
    getName() {
      return this.name;
    },
    getAge() {
      return this.age;
    }

  }
});

