var _jm = null;
function open_empty() {
    var options = {
        container: 'jsmind_container',
        theme: '',
        editable: true,
        log_level: 'debug',
        view: {
            engine: 'canvas',
            draggable: true,
            enable_device_pixel_ratio: false,
        },
        plugin: {
            screenshot: {
                background: '#ffffff',
            },
        },
    };
    _jm = new jsMind(options);
    _jm.show();
}

function open_json() {
    var mind = {
        meta: {
            name: 'jsMind remote',
            author: 'hizzgdev@163.com',
            version: '0.2',
        },
        format: 'node_tree',
        "data":{"id":"root","topic":"jsMind 介绍","children":[{"direction":"left","expanded":true,"topic":"动手试一试吧!","background-color":"#f39c12","leading-line-color":"#e67e22","foreground-color":"#000000","border-width":0,"id":"lv2-1","children":[{"children":[{"id":"lv4-3","children":[{"child-3-1":[{"topic":"child-4-1","id":"lv6-5"},{"topic":"child-4-2","node-class":["theme-success"],"id":"lv6-6"}],"id":"lv5-4","children":[{"topic":"child-4-1","id":"lv6-5"},{"topic":"child-4-2","node-class":["theme-success"],"id":"lv6-6"}],"topic":"child-3-1"}],"topic":"child-2-1"}],"topic":"child-1-1","id":"lv3-2"},{"children":[{"id":"lv4-8","children":[{"child-3-2":[{"topic":"child-4-3","id":"lv6-10"},{"topic":"child-4-4","id":"lv6-11"}],"id":"lv5-9","children":[{"topic":"child-4-3","id":"lv6-10"},{"topic":"child-4-4","id":"lv6-11"}],"topic":"child-3-2"},{"children":[{"child-3-3":[{"topic":"child-4-5","id":"lv7-14"},{"topic":"child-4-6","id":"lv7-15"}],"child-3-4":["child-4-7","child-4-8"],"id":"lv6-13","children":[{"topic":"child-4-5","id":"lv7-14"},{"topic":"child-4-6","id":"lv7-15"}],"topic":"child-3-3"}],"topic":"child-2-3","id":"lv5-12"}],"topic":"child-2-2"}],"topic":"child-1-2","id":"lv3-7"},{"children":[{"topic":"child-2-4","node-class":["theme-danger"],"id":"lv4-17","children":[{"children":[{"child-4-1":[{"topic":"child-4-9","id":"lv7-20"}],"id":"lv6-19","children":[{"topic":"child-4-9","id":"lv7-20"}],"topic":"child-4-1"}],"topic":"child-3-5","id":"lv5-18"}]}],"topic":"child-1-3","id":"lv3-16"}]},{"children":[{"topic":"单击: 选择节点","id":"lv3-22"},{"topic":"双击: 进入编辑模式，回车保存","id":"lv3-23"},{"topic":"拖动: 摆放节点","id":"lv3-24"},{"topic":"点小圆圈: 展开/收缩子节点","id":"lv3-25"}],"direction":"right","expanded":false,"topic":"鼠标操作","id":"lv2-21"},{"topic":"键盘操作","direction":"right","children":[{"id":"1007","topic":"Enter: 添加同级节点"},{"id":"f389","topic":"Ctrl+Enter: 添加下级节点"},{"id":"9b69","topic":"F2: 进入编辑模式，回车保存"},{"id":"15e3","topic":"Delete: 删除节点"},{"id":"1565","topic":"Space: 展开/收缩子节点"},{"id":"27ca","topic":"快捷键能改也能加"}],"id":"lv2-26"},{"topic":"用 jsMind 的理由?","direction":"left","children":[{"id":"471a","topic":"开源"},{"id":"693b","topic":"快, 很快"},{"id":"1405","topic":"简洁"},{"id":"394a","topic":"支持主题也能自定义样式"},{"id":"2a63","topic":"免费无广告"},{"id":"5e48","topic":"一个浏览器足够"}],"id":"lv2-27"}]},"format":"node_tree","meta":{"version":"0.2"},
    };
    _jm.show(mind);
}

function open_remote() {
    fetch('data_example.json')
        .then(resp => resp.json())
        .then(mind => _jm.show(mind));
}

function screen_shot() {
    _jm.shoot();
}

function show_data() {
    var mind_data = _jm.get_data();
    var mind_string = jsMind.util.json.json2string(mind_data);
    prompt_info(mind_string);
}

function save_file() {
    var mind_data = _jm.get_data();
    var mind_name = mind_data.meta.name;
    var mind_str = jsMind.util.json.json2string(mind_data);
    jsMind.util.file.save(mind_str, 'text/jsmind', mind_name + '.jm');
}

function open_file() {
    var file_input = document.getElementById('file_input');
    var files = file_input.files;
    if (files.length > 0) {
        var file_data = files[0];
        jsMind.util.file.read(file_data, function (jsmind_data, jsmind_name) {
            var mind = jsMind.util.json.string2json(jsmind_data);
            if (!!mind) {
                _jm.show(mind);
            } else {
                prompt_info('can not open this file as mindmap');
            }
        });
    } else {
        prompt_info('please choose a file first');
    }
}

function select_node() {
    var nodeid = 'other';
    _jm.select_node(nodeid);
}

function show_selected() {
    var selected_node = _jm.get_selected_node();
    if (!!selected_node) {
        prompt_info(selected_node.topic);
    } else {
        prompt_info('nothing');
    }
}

function get_selected_nodeid() {
    var selected_node = _jm.get_selected_node();
    if (!!selected_node) {
        return selected_node.id;
    } else {
        return null;
    }
}

function add_node() {
    var selected_node = _jm.get_selected_node(); // as parent of new node
    if (!selected_node) {
        prompt_info('please select a node first.');
        return;
    }

    var nodeid = jsMind.util.uuid.newid();
    var topic = '* Node_' + nodeid.substr(nodeid.length - 6) + ' *';
    var node = _jm.add_node(selected_node, nodeid, topic);
}

var imageChooser = document.getElementById('image-chooser');

imageChooser.addEventListener(
    'change',
    function (event) {
        // Read file here.
        var reader = new FileReader();
        reader.onloadend = function () {
            var selected_node = _jm.get_selected_node();
            var nodeid = jsMind.util.uuid.newid();
            var topic = undefined;
            var data = {
                'background-image': reader.result,
                'width': '100',
                'height': '100',
            };
            var node = _jm.add_node(selected_node, nodeid, topic, data);
            //var node = _jm.add_image_node(selected_node, nodeid, reader.result, 100, 100);
            //add_image_node:function(parent_node, nodeid, image, width, height, data, idx, direction, expanded){
        };

        var file = imageChooser.files[0];
        if (file) {
            reader.readAsDataURL(file);
        }
    },
    false
);

function add_image_node() {
    var selected_node = _jm.get_selected_node(); // as parent of new node
    if (!selected_node) {
        prompt_info('please select a node first.');
        return;
    }

    imageChooser.focus();
    imageChooser.click();
}

function modify_node() {
    var selected_id = get_selected_nodeid();
    if (!selected_id) {
        prompt_info('please select a node first.');
        return;
    }

    // modify the topic
    _jm.update_node(selected_id, '--- modified ---');
}

function move_to_first() {
    var selected_id = get_selected_nodeid();
    if (!selected_id) {
        prompt_info('please select a node first.');
        return;
    }

    _jm.move_node(selected_id, '_first_');
}

function move_to_last() {
    var selected_id = get_selected_nodeid();
    if (!selected_id) {
        prompt_info('please select a node first.');
        return;
    }

    _jm.move_node(selected_id, '_last_');
}

function move_node() {
    // move a node before another
    _jm.move_node('other', 'open');
}

function remove_node() {
    var selected_id = get_selected_nodeid();
    if (!selected_id) {
        prompt_info('please select a node first.');
        return;
    }

    _jm.remove_node(selected_id);
}

function change_text_font() {
    var selected_id = get_selected_nodeid();
    if (!selected_id) {
        prompt_info('please select a node first.');
        return;
    }

    _jm.set_node_font_style(selected_id, 28);
}

function change_text_color() {
    var selected_id = get_selected_nodeid();
    if (!selected_id) {
        prompt_info('please select a node first.');
        return;
    }

    _jm.set_node_color(selected_id, null, '#000');
}

function change_background_color() {
    var selected_id = get_selected_nodeid();
    if (!selected_id) {
        prompt_info('please select a node first.');
        return;
    }

    _jm.set_node_color(selected_id, '#eee', null);
}

function change_background_image() {
    var selected_id = get_selected_nodeid();
    if (!selected_id) {
        prompt_info('please select a node first.');
        return;
    }

    _jm.set_node_background_image(selected_id, 'ant.png', 100, 100);
}

function set_theme(theme_name) {
    _jm.set_theme(theme_name);
}

var zoomInButton = document.getElementById('zoom-in-button');
var zoomOutButton = document.getElementById('zoom-out-button');

function zoomIn() {
    if (_jm.view.zoom_in()) {
        zoomOutButton.disabled = false;
    } else {
        zoomInButton.disabled = true;
    }
}

function zoomOut() {
    if (_jm.view.zoom_out()) {
        zoomInButton.disabled = false;
    } else {
        zoomOutButton.disabled = true;
    }
}

function toggle_editable(btn) {
    var editable = _jm.get_editable();
    if (editable) {
        _jm.disable_edit();
        btn.innerHTML = 'enable editable';
    } else {
        _jm.enable_edit();
        btn.innerHTML = 'disable editable';
    }
}

// this method change size of container, perpare for adjusting jsmind
function change_container() {
    var c = document.getElementById('jsmind_container');
    c.style.width = '800px';
    c.style.height = '500px';
}

function resize_jsmind() {
    _jm.resize();
}

function expand() {
    var selected_id = get_selected_nodeid();
    if (!selected_id) {
        prompt_info('please select a node first.');
        return;
    }

    _jm.expand_node(selected_id);
}

function collapse() {
    var selected_id = get_selected_nodeid();
    if (!selected_id) {
        prompt_info('please select a node first.');
        return;
    }

    _jm.collapse_node(selected_id);
}

function toggle() {
    var selected_id = get_selected_nodeid();
    if (!selected_id) {
        prompt_info('please select a node first.');
        return;
    }

    _jm.toggle_node(selected_id);
}

function expand_all() {
    _jm.expand_all();
}

function expand_to_level2() {
    _jm.expand_to_depth(2);
}

function expand_to_level3() {
    _jm.expand_to_depth(3);
}

function collapse_all() {
    _jm.collapse_all();
}

function get_nodearray_data() {
    var mind_data = _jm.get_data('node_array');
    var mind_string = jsMind.util.json.json2string(mind_data);
    prompt_info(mind_string);
}

function save_nodearray_file() {
    var mind_data = _jm.get_data('node_array');
    var mind_name = mind_data.meta.name;
    var mind_str = jsMind.util.json.json2string(mind_data);
    jsMind.util.file.save(mind_str, 'text/jsmind', mind_name + '.jm');
}

function open_nodearray() {
    var file_input = document.getElementById('file_input_nodearray');
    var files = file_input.files;
    if (files.length > 0) {
        var file_data = files[0];
        jsMind.util.file.read(file_data, function (jsmind_data, jsmind_name) {
            var mind = jsMind.util.json.string2json(jsmind_data);
            if (!!mind) {
                _jm.show(mind);
            } else {
                prompt_info('can not open this file as mindmap');
            }
        });
    } else {
        prompt_info('please choose a file first');
    }
}

function get_freemind_data() {
    var mind_data = _jm.get_data('freemind');
    var mind_string = jsMind.util.json.json2string(mind_data);
    alert(mind_string);
}

function save_freemind_file() {
    var mind_data = _jm.get_data('freemind');
    var mind_name = mind_data.meta.name || 'freemind';
    var mind_str = mind_data.data;
    jsMind.util.file.save(mind_str, 'text/xml', mind_name + '.mm');
}

function open_freemind() {
    var file_input = document.getElementById('file_input_freemind');
    var files = file_input.files;
    if (files.length > 0) {
        var file_data = files[0];
        jsMind.util.file.read(file_data, function (freemind_data, freemind_name) {
            if (freemind_data) {
                var mind_name = freemind_name;
                if (/.*\.mm$/.test(mind_name)) {
                    mind_name = freemind_name.substring(0, freemind_name.length - 3);
                }
                var mind = {
                    meta: {
                        name: mind_name,
                        author: 'hizzgdev@163.com',
                        version: '1.0.1',
                    },
                    format: 'freemind',
                    data: freemind_data,
                };
                _jm.show(mind);
            } else {
                prompt_info('can not open this file as mindmap');
            }
        });
    } else {
        prompt_info('please choose a file first');
    }
}

function prompt_info(msg) {
    alert(msg);
}

open_empty();
open_json();
