class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;

            return this;
        }

        return this.$el.outerHTML.trim();
    }

    get data() {
        return this.$el.dataset;
    }

    id(parse) {
        const { id } = this.data;

        if (parse) {
            const [row, col] = id.split(':');

            return [
                parseInt(row),
                parseInt(col)
            ];
        }

        return id;
    }

    attr(name, value) {
        if (value !== undefined) {
            this.$el.setAttribute(name, value);

            return this;
        }

        return this.$el.getAttribute(name);
    }

    clear() {
        this.html('');

        return this;
    }

    parent() {
        return $(this.$el.parentNode);
    }

    coords() {
        return this.$el.getBoundingClientRect();
    }

    replace(newChild, selector) {
        const oldChild = this.find(selector);

        this.$el.replaceChild(newChild.$el, oldChild.$el);
    }

    find(selector) {
        const element = this.$el.querySelector(selector);

        return $(element);
    }

    toggleClass(classList, add = true) {
        this.$el.classList[add ? 'add' : 'remove'](classList);
    }

    css(styles = {}, prefix = '') {
        Object
            .keys(styles)
            .forEach(name => this.$el.style[name] = styles[name] + prefix);
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }

        // Polyfill
        if (Element.prototype.append) {
            this.$el.append(node);
        }
        else {
            this.$el.appendChild(node);
        }

        return this;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }
}


export function $(selector) {
    return new Dom(selector);
}


$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);

    if (classes) {
        el.classList.add(classes);
    }

    return $(el);
};
