import Element from 'element-ui'
const INPUT_DEFALUT_SETTING = {
    size: 'small',
    maxlength: 10,
    minlength: 1,
}
export default {
    name: 'InputWrapper',
    props: {...Element.Input.props, random: {require: true} },
    watch: {
        random(){
            let input = this.$refs.input.$el.getElementsByTagName('input')[0]
            let inputValue = input.value.trim()
            if(!inputValue){
                input.style.borderColor = '#ef7e7e'
            }
        }
    },
    methods: {
        blur(e){
            e.target.style.borderColor = '#dcdfe6'
            this.$emit('blur', {...arguments})
        },
        focus(e){
            e.target.style.borderColor = '#409EFF'
            this.$emit('focus', {...arguments})
        }
    },
    render(h) {
        let data = {
            on: this.$listeners,
            props: { ...this.$props},
            attrs: this.$attrs
        }
        for (const key in INPUT_DEFALUT_SETTING) {
            if (data.props[key] === undefined) {
                data.props[key] = INPUT_DEFALUT_SETTING[key]
            }
        }
        data.props.placeholder = 
            data.props.placeholder ? 
                `请输入${data.props.placeholder} (长度小于${data.props.maxlength})`
                : `请输入长度小于${data.props.maxlength}的内容`
        return (
            <el-input ref="input"  {...data} onBlur={this.blur} onFocus={this.focus}></el-input>
        )
    }
}


