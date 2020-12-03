import React from 'react'
import Login from './Login'
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { configure, mount, shallow } from 'enzyme'

configure({ adapter: new Adapter() })

describe("<Login />", () => {
	let wrapper;
	const setState = jest.fn();
	const useStateSpy = jest.spyOn(React, "useState")
	useStateSpy.mockImplementation((init) => [init, setState]);

	beforeEach(() => {
		wrapper = mount(shallow(
			<Router>
					<Switch>
							<Login/>
					</Switch>
				</Router>).get(0))
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Title input", () => {
		it("Should capture title correctly onChange", () => {
			const title = wrapper.find("Input").at(0);
			title.instance().value = "Test@gmail.com";
			title.simulate("change");
			expect(setState).toHaveBeenCalledWith({
				email: 'Test@gmail.com',
				password: ''
			});
		});
	});

})