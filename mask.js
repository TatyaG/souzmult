const mask = () => {
    function setMask() {
        let matrix = '+###############';

        let phoneNumber;

        maskList.forEach(item => {
            let code = item.code.replace(/[\s#]/g, ''),
                phone = this.value.replace(/[\s#-)(]/g, '');

            if (phone.includes(code)) {
                console.log(phone, code, item.code);
                matrix = item.code;

                phoneNumber =  item.code.replace(/[- +)(]/g, '');
                console.log(phoneNumber)

            }
        });

        let i = 0,
            val = this.value.replace(/\D/g, '');

        this.value = matrix.replace(/(?!\+)./g, function(a) {
            return /[#\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

    }

    let inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach(input => {
        if (!input.value) input.value = '+';
        input.addEventListener('input', setMask);
        input.addEventListener('focus', setMask);
        input.addEventListener('blur', setMask);
    });
};